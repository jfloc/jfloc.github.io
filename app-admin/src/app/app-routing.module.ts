import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CountryListComponent } from "./country-list/country-list.component";
import { AddCountryComponent } from "./add-country/add-country.component";

const routes: Routes = [
  { path: "", redirectTo: "/countries", pathMatch: "full" },
  { path: "countries", component: CountryListComponent },
  { path: "add-country", component: AddCountryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
