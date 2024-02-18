import { Routes } from '@angular/router';
import { GetCountriesComponent } from './get-countries/get-countries.component';
import { AddCountryComponent } from './add-country/add-country.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PackagesComponent } from './packages/packages.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'get-countries', component: GetCountriesComponent },
  { path: 'add-country', component: AddCountryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'packages', component: PackagesComponent },
  { path: '**', component: PageNotFoundComponent },
];
