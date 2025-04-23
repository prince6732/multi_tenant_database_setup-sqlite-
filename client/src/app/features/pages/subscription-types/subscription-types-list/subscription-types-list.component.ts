import { Component } from '@angular/core';
import { SubscriptionTypes } from '../../../../shared/interface/interface';
import { SubscriptionTypesService } from '../../../../core/services/subscription-types.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SubscriptionTypesFormComponent } from '../subscription-types-form/subscription-types-form.component';

@Component({
  selector: 'app-subscription-types-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SubscriptionTypesFormComponent,
  ],
  templateUrl: './subscription-types-list.component.html',
})
export class SubscriptionTypesListComponent {
  subscriptionTypes: SubscriptionTypes[] = [];
  editModal: SubscriptionTypes | null = null;
  showCompletionModal = false;

  constructor(private subscriptionTypesService: SubscriptionTypesService) {}

  ngOnInit(): void {
    this.getAllSubscriptionTypes();
  }

  // get all subscription types
  getAllSubscriptionTypes(): void {
    this.subscriptionTypesService.getAllSubscriptionTypes().subscribe({
      next: (data) => {
        this.subscriptionTypes = data;
      },
      error: (e) => console.error(e),
    });
  }

  openModal(): void {
    this.editModal = null;
    this.showCompletionModal = true;
  }

  // close model
  closeModal(e: boolean): void {
    this.showCompletionModal = false;
    if (e) {
      this.getAllSubscriptionTypes();
    }
  }

  openEditModal(event: Event, subscriptionTypes: SubscriptionTypes): void {
    event.stopPropagation();
    this.editModal = subscriptionTypes;
    this.showCompletionModal = true;
  }
}
