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
            '../../../features/pages/user-management/user-management.component'
          ).then((m) => m.UserManagementComponent),
        canActivate: [authGuard],
      },
      {
        path: 'locations',
        loadComponent: () =>
          import(
            '../../../features/pages/location-management/location-management.component'
          ).then((m) => m.LocationManagementComponent),
        canActivate: [authGuard],
      },
      {
        path: 'transports',
        loadComponent: () =>
          import(
            '../../../features/pages/transport-management/transport-management.component'
          ).then((m) => m.TransportManagementComponent),
        canActivate: [authGuard],
      },
      {
        path: 'transport-requests',
        loadComponent: () =>
          import(
            '../../../features/pages/transport-requests/transport-requests.component'
          ).then((m) => m.TransportRequestsComponent),
        canActivate: [authGuard],
      },
      {
        path: 'subscription-types',
        loadComponent: () =>
          import(
            '../../../features/pages/subscription-types/subscription-types.component'
          ).then((m) => m.SubscriptionTypesComponent),
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
