import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // dashboard routing module routes
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./shared/layouts/dashboard/dashboard-routing.module').then(
        (m) => m.DashboardRoutingModule
      ),
  },

  // login
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },

  // not found
  { path: 'notfound', component: NotFoundComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/notfound' },
];
