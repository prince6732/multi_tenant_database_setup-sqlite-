import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { State } from '../../../../../shared/interface/interface';
import { StateService } from '../../../../../core/services/state.service';
import { ValidateAllFormFields } from '../../../../../core/utils/CustomValidator';

@Component({
  selector: 'app-states-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './states-form.component.html',
})
export class StatesFormComponent implements OnInit {
  rForm: FormGroup;
  @Input() data: State | null = null;
  @Output() panelClosed = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private stateService: StateService) {
    this.rForm = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
      ],
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
        this.stateService.updateState(this.data.id, formData).subscribe({
          next: () => {
            this.closeModal(true);
          },
          error: (err) => console.log(err),
        });
      } else {
        // Create new option
        this.stateService.createState(formData).subscribe({
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
