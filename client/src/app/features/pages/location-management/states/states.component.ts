import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { State } from '../../../../shared/interface/interface';
import { StateService } from '../../../../core/services/state.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SweetalertComponent } from '../../../../shared/components/sweetalert.component';

@Component({
  selector: 'app-states',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './states.component.html',
})
export class StatesComponent implements OnInit {
  states: State[] = [];
  searchStates: State[] = [];
  search: string = '';

  constructor(
    private stateService: StateService,
    private router: Router
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
}
