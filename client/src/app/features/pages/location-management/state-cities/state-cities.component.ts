import { Component } from '@angular/core';
import { City } from '../../../../shared/interface/interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StateCitiesService } from '../../../../core/services/state-cities.service';
import { SweetalertComponent } from '../../../../shared/components/sweetalert.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-state-cities',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './state-cities.component.html',
})
export class StateCitiesComponent {
  cities: City[] = [];
  state_id!: number;
  stateName: string = '';
  searchCities: City[] = [];
  search: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cityService: StateCitiesService
  ) {
    this.state_id = Number(this.route.snapshot.paramMap.get('state_id'));
  }

  ngOnInit(): void {
    this.getCitiesByState();
    console.log(this.stateName);
  }

  // get all cities by state
  getCitiesByState(): void {
    this.cityService.getAllCitiesByState(this.state_id).subscribe({
      next: (data: any) => {
        this.cities = data.cities;
        this.searchCities = data.cities;
        this.stateName = data?.stateName;
      },
      error: (e) => console.error(e),
    });
  }

  // search cities
  searchCity(): void {
    this.searchCities = this.cities.filter((city) =>
      city.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  // view all state
  viewStates() {
    this.router.navigate(['locations']);
  }
}
