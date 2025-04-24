import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { City } from '../../../../../shared/interface/interface';
import { StateCitiesService } from '../../../../../core/services/state-cities.service';
import { ActivatedRoute } from '@angular/router';
import { ValidateAllFormFields } from '../../../../../core/utils/CustomValidator';

@Component({
  selector: 'app-cities-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cities-form.component.html',
})
export class CitiesFormComponent implements OnInit {
  rForm: FormGroup;
  state_id!: number;
  @Input() data: City | null = null;
  @Output() panelClosed = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private citiesService: StateCitiesService,
    private route: ActivatedRoute
  ) {
    this.rForm = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
      ],
      pincode: [
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
    this.state_id = Number(this.route.snapshot.paramMap.get('state_id'));
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
        this.citiesService.updateCity(this.data.id, formData).subscribe({
          next: () => {
            this.closeModal(true);
          },
          error: (err) => console.log(err),
        });
      } else {
        // Create new option
        this.citiesService.createCity(this.state_id, formData).subscribe({
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
