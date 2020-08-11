import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {  APP_ROUTE } from "./app.routes";

import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {  HttpClientModule } from '@angular/common/http';
import { CovidService } from './components/services/covid.service';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { TableComponent } from './components/table/table.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { SingleCountryComponent } from './components/single-country/single-country.component';
import { PageNotFoundComponent } from './components/error/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    TableComponent,
    LoadingComponent,
    SingleCountryComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTE),
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [CovidService],
  bootstrap: [AppComponent],
})
export class AppModule {}
