import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SubscriptionTypes } from '../../../shared/interface/interface';
import { ActivatedRoute } from '@angular/router';
import { CreateTransportService } from '../../../core/services/create-transport.service';
import { CommonModule, Location } from '@angular/common';
import { SubscriptionTypesService } from '../../../core/services/subscription-types.service';
import { ProcessingComponent } from "../../../shared/components/processing.component";

@Component({
  selector: 'app-create-transport',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProcessingComponent],
  templateUrl: './create-transport.component.html',
})
export class CreateTransportComponent implements OnInit {
  rForm: FormGroup;
  request_id!: string;
  subscriptionTypes: SubscriptionTypes[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private createTransportService: CreateTransportService,
    private subscriptionTypesService: SubscriptionTypesService,
    private location: Location
  ) {
    this.rForm = this.fb.group({
      name: ['', Validators.required],
      dbname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      prefix: ['', Validators.required],
      subscription_type_id: ['', Validators.required],
      activated_at: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.request_id = params['request_id'];
    });
    this.getAllSubscriptionTypes();
  }

  getAllSubscriptionTypes(): void {
    this.subscriptionTypesService.getAllSubscriptionTypes().subscribe({
      next: (data) => {
        this.subscriptionTypes = data;
      },
      error: (e) => console.error(e),
    });
  }

  onSubmit(): void {
    if (this.rForm.valid) {
      this.loading = true; // Start loading
      const formData = this.rForm.value;
      this.createTransportService
        .createTransport(this.request_id, formData)
        .subscribe({
          next: () => {
            this.loading = false; // Stop loading
            this.location.back();
            this.rForm.reset();
          },
          error: (err) => {
            this.loading = false; // Stop loading
            console.log('Error: ' + err.error.message);
          },
        });
    } else {
      this.rForm.markAllAsTouched();
    }
  }
}
