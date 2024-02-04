import { Component, OnInit } from "@angular/core";
import { CountryService } from "../country.service";

@Component({
  selector: "app-add-country",
  templateUrl: "./add-country.component.html",
  styleUrls: ["./add-country.component.css"],
})
export class AddCountryComponent {
  countryName = "";

  constructor(private countryService: CountryService) {}

  addCountry(): void {
    if (this.countryName.trim()) {
      this.countryService
        .addCountry({ name: this.countryName })
        .subscribe(() => {});
    }
  }
}
