import { Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';

export const APP_ROUTE: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path:'', pathMatch:'full', redirectTo:'dashboard'},
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' }
];

