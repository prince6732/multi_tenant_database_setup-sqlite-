import { Component, OnInit } from '@angular/core';
import { City } from '../../../../../shared/interface/interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StateCitiesService } from '../../../../../core/services/state-cities.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitiesFormComponent } from '../cities-form/cities-form.component';
import { SweetalertComponent } from '../../../../../shared/components/sweetalert.component';

@Component({
  selector: 'app-cities-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CitiesFormComponent],
  templateUrl: './cities-list.component.html',
})
export class CitiesListComponent implements OnInit {
  cities: City[] = [];
  state_id!: number;
  stateName: string = '';
  searchCities: City[] = [];
  search: string = '';
  editModal: City | null = null;
  showCompletionModal = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cityService: StateCitiesService,
    private sweetalertComponent: SweetalertComponent
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

  openModal(): void {
    this.editModal = null;
    this.showCompletionModal = true;
  }

  // close model
  closeModal(e: boolean): void {
    this.showCompletionModal = false;
    if (e) {
      this.getCitiesByState();
    }
  }

  openEditModal(event: Event, city: City): void {
    event.stopPropagation();
    this.editModal = city;
    this.showCompletionModal = true;
  }

  // delete city by id
  deleteCity(city_id: number): void {
    this.sweetalertComponent
      .confirmDelete('Are You Sure! You want to Delete this City?')
      .then((result) => {
        if (result.isConfirmed) {
          this.cityService.deleteCity(city_id).subscribe({
            next: () => {
              this.getCitiesByState();
              this.sweetalertComponent.showToast(
                'The City has been Deleted',
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
