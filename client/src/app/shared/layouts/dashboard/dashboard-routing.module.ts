import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { authGuard } from '../../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import(
            '../../../features/pages/user-management/user-table/user-table.component'
          ).then((m) => m.UserTableComponent),
      },
      {
        path: 'locations',
        loadComponent: () =>
          import(
            '../../../features/pages/location-management/states/states.component'
          ).then((m) => m.StatesComponent),
        canActivate: [authGuard],
      },
      {
        path: 'locations/:state_id/cities',
        loadComponent: () =>
          import(
            '../../../features/pages/location-management/state-cities/state-cities.component'
          ).then((m) => m.StateCitiesComponent),
        canActivate: [authGuard],
      },
      {
        path: 'transports',
        loadComponent: () =>
          import(
            '../../../features/pages/transport-management/transport-states/transport-states.component'
          ).then((m) => m.TransportStatesComponent),
        canActivate: [authGuard],
      },
      {
        path: 'transports/transport-cities/:state_id',
        loadComponent: () =>
          import(
            '../../../features/pages/transport-management/transport-cities/transport-cities.component'
          ).then((m) => m.TransportCitiesComponent),
        canActivate: [authGuard],
      },
      {
        path: 'transports/getCities-transport/:city_id',
        loadComponent: () =>
          import(
            '../../../features/pages/transport-management/tenants/tenants.component'
          ).then((m) => m.TenantsComponent),
        canActivate: [authGuard],
      },
      {
        path: 'transport-requests',
        loadComponent: () =>
          import(
            '../../../features/pages/transport-requests/transport-requests/transport-requests.component'
          ).then((m) => m.TransportRequestsComponent),
        canActivate: [authGuard],
      },
      {
        path: 'transport-requests/show/:request_id',
        loadComponent: () =>
          import(
            '../../../features/pages/transport-requests/transport-requests-details/transport-requests-details.component'
          ).then((m) => m.TransportRequestsDetailsComponent),
        canActivate: [authGuard],
      },
      {
        path: 'activate-transport/:request_id',
        loadComponent: () =>
          import(
            '../../../features/pages/create-transport/create-transport.component'
          ).then((m) => m.CreateTransportComponent),
        canActivate: [authGuard],
      },
      {
        path: 'subscription-types',
        loadComponent: () =>
          import(
            '../../../features/pages/subscription-types/subscription-types-list/subscription-types-list.component'
          ).then((m) => m.SubscriptionTypesListComponent),
        canActivate: [authGuard],
      },
      {
        path: 'contact-us',
        loadComponent: () =>
          import(
            '../../../features/pages/contact-us/contact-us.component'
          ).then((m) => m.ContactUsComponent),
        canActivate: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
