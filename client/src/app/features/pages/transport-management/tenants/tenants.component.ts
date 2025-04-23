import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Transport } from '../../../../shared/interface/interface';
import { TransportManagementService } from '../../../../core/services/transport-management.service';

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tenants.component.html',
})
export class TenantsComponent {
  transports: Transport[] = [];
  city_id!: number;
  cityName: string = '';
  stateName: string = '';

  constructor(
    private route: ActivatedRoute,
    private transportManagementService: TransportManagementService
  ) {
    this.city_id = Number(this.route.snapshot.paramMap.get('city_id'));
  }

  ngOnInit(): void {
    this.getTenantsByCity();
  }

  // get all transports
  getTenantsByCity(): void {
    this.transportManagementService.getTenantsByCity(this.city_id).subscribe({
      next: (data: any) => {
        this.transports = data.tenants;
        this.cityName = data?.cityName;
        this.stateName = data?.stateName;
      },
      error: (e) => console.error(e),
    });
  }
}
