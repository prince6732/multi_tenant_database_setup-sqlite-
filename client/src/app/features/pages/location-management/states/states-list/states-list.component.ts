import { Component } from '@angular/core';
import { State } from '../../../../../shared/interface/interface';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StateService } from '../../../../../core/services/state.service';
import { StatesFormComponent } from '../states-form/states-form.component';
import { SweetalertComponent } from '../../../../../shared/components/sweetalert.component';

@Component({
  selector: 'app-states-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, StatesFormComponent],
  templateUrl: './states-list.component.html',
})
export class StatesListComponent {
  states: State[] = [];
  searchStates: State[] = [];
  search: string = '';
  editModal: State | null = null;
  showCompletionModal = false;

  constructor(
    private stateService: StateService,
    private router: Router,
    private sweetalertComponent: SweetalertComponent
  ) {}

  ngOnInit(): void {
    this.getAllStates();
  }

  // get all states
  getAllStates(): void {
    this.stateService.getAllStates().subscribe({
      next: (data) => {
        this.states = data;
        this.searchStates = data;
      },
      error: (e) => console.error(e),
    });
  }

  // search states
  searchState(): void {
    this.searchStates = this.states.filter((state) =>
      state.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  // view state cities
  viewStateCities(event: Event, state_id: number) {
    if (!(event.target as HTMLElement).closest('button')) {
      this.router.navigate(['locations', state_id, 'cities']);
    }
  }

  openModal(): void {
    this.editModal = null;
    this.showCompletionModal = true;
  }

  // close model
  closeModal(e: boolean): void {
    this.showCompletionModal = false;
    if (e) {
      this.getAllStates();
    }
  }

  openEditModal(event: Event, state: State): void {
    event.stopPropagation();
    this.editModal = state;
    this.showCompletionModal = true;
  }

  // delete state by id
  deleteState(state_id: number): void {
    this.sweetalertComponent
      .confirmDelete('Are You Sure! You want to Delete this State?')
      .then((result) => {
        if (result.isConfirmed) {
          this.stateService.deleteState(state_id).subscribe({
            next: () => {
              this.getAllStates();
              this.sweetalertComponent.showToast(
                'The State has been Deleted',
                'success',
                2000
              );
            },
            error: (err) => {
              this.sweetalertComponent.showToast(
                err.error.message,
                'error',
                2000
              );
            },
          });
        }
      });
  }
}
