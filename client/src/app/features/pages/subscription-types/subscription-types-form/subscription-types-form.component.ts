import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SubscriptionTypes } from '../../../../shared/interface/interface';
import { SubscriptionTypesService } from '../../../../core/services/subscription-types.service';
import { ValidateAllFormFields } from '../../../../core/utils/CustomValidator';

@Component({
  selector: 'app-subscription-types-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './subscription-types-form.component.html',
})
export class SubscriptionTypesFormComponent implements OnInit {
  rForm: FormGroup;
  @Input() data: SubscriptionTypes | null = null;
  @Output() panelClosed = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private subscriptionTypesService: SubscriptionTypesService
  ) {
    this.rForm = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ]),
      ],
      price: ['', Validators.compose([Validators.required, Validators.min(1)])],
      duration: ['', Validators.compose([Validators.required])],
      status: [false],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.rForm.patchValue(this.data); // Populate the form for editing
    }
  }

  // close modal
  closeModal(action: boolean): void {
    this.panelClosed.emit(action);
  }

  // Submit form (create and update)
  onSubmit(): void {
    if (this.rForm.valid) {
      const formData = this.rForm.value;
      if (this.data) {
        // Update existing option
        this.subscriptionTypesService
          .updateSubscriptionType(this.data.id, formData)
          .subscribe({
            next: () => {
              this.closeModal(true);
            },
            error: (err) => console.log(err),
          });
      } else {
        // Create new option
        this.subscriptionTypesService
          .createSubscriptionType(formData)
          .subscribe({
            next: () => {
              this.closeModal(true);
            },
            error: (err) => console.log(err),
          });
      }
    } else {
      ValidateAllFormFields.validateAllFormFields(this.rForm);
    }
  }
}
