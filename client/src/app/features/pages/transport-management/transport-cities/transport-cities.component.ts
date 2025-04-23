import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { City } from '../../../../shared/interface/interface';
import { TransportManagementService } from '../../../../core/services/transport-management.service';

@Component({
  selector: 'app-transport-cities',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './transport-cities.component.html',
})
export class TransportCitiesComponent implements OnInit{
  cities: City[] = [];
  state_id!: number;
  stateName: string = '';
  searchCities: City[] = [];
  search: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
     private transportManagementService: TransportManagementService,
  ) {
    this.state_id = Number(this.route.snapshot.paramMap.get('state_id'));
  }

  ngOnInit(): void {
    this.getAllTransportCities();
  }

  // get all cities by state
  getAllTransportCities(): void {
    this.transportManagementService.getAllTransportCities(this.state_id).subscribe({
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

  viewTransportByCity(event: Event, city_id: number) {
    if (!(event.target as HTMLElement).closest('button')) {
      this.router.navigate(['transports/getCities-transport', city_id]);
    }
  }
}
