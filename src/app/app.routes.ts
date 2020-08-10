import { Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SingleCountryComponent } from './components/single-country/single-country.component';

export const APP_ROUTE: Routes = [
         { path: 'dashboard', component: DashboardComponent },
         { path: 'country/:country', component: SingleCountryComponent },
         { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
         { path: '**', pathMatch: 'full', redirectTo: 'dashboard' },
       ];

