import { Component, OnInit } from '@angular/core';
import { State } from '../../../../shared/interface/interface';
import { TransportManagementService } from '../../../../core/services/transport-management.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transport-states',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './transport-states.component.html',
})
export class TransportStatesComponent implements OnInit {
  states: State[] = [];
  searchStates: State[] = [];
  search: string = '';

  constructor(
    private transportManagementService: TransportManagementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllStates();
  }

  // get all states
  getAllStates(): void {
    this.transportManagementService.getAllStates().subscribe({
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

  // get all transport cities by state id 
  viewTransportCities(event: Event, state_id: number) {
    if (!(event.target as HTMLElement).closest('button')) {
      this.router.navigate(['transports/transport-cities', state_id]);
    }
  }
}
