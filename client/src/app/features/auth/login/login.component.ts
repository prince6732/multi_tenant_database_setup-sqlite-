import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { ValidateAllFormFields } from '../../../core/utils/CustomValidator';
import { ProcessingComponent } from '../../../shared/components/processing.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ProcessingComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  rForm!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  loginError = '';
  isProcessing = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    // if user is logged in then user not redirect on '/login' page.
    if (this.tokenStorageService.isAuthenticated()) {
      this.router.navigate([this.location.back()]);
      this.isLoggedIn = true;
    }

    this.rForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  // submit
  onSubmit(): void {
    if (this.rForm.valid) {
      this.authService.login(this.rForm.value).subscribe({
        next: (data) => {
          if (data.accessToken) {
            this.tokenStorageService.saveToken(data.accessToken);
            this.tokenStorageService.saveUser(data.user);
            this.isLoginFailed = false;
            this.isProcessing = true;
            setTimeout(() => {
              this.isProcessing = false;
              this.isLoggedIn = true;
              this.router.navigate(['/uf-admin']);
            }, Math.floor(Math.random() * 1000) + 1000);
          }
        },
        error: (error) => {
          this.isProcessing = true;
          setTimeout(() => {
            this.isProcessing = false;
            this.isLoginFailed = true;
            this.rForm.markAsUntouched();
            this.handleError(error);
          }, Math.floor(Math.random() * 1000) + 1000);
        },
      });
    } else {
      ValidateAllFormFields.validateAllFormFields(this.rForm);
    }
  }

  // error handler
  private handleError(err: any): void {
    if (err.error && err.error.message) {
      this.loginError = err.error.message;
    } else {
      this.loginError = 'An error occurred during login.';
    }
    this.isLoginFailed = true;
  }
}
