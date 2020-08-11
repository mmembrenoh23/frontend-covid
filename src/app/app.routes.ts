import { Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SingleCountryComponent } from './components/single-country/single-country.component';
import { PageNotFoundComponent } from './components/error/page-not-found/page-not-found.component';

export const APP_ROUTE: Routes = [
         { path: 'dashboard', component: DashboardComponent },
         { path: 'country/:country', component: SingleCountryComponent },
         { path: '', component: PageNotFoundComponent },
         { path: '**', component: PageNotFoundComponent },
       ];

