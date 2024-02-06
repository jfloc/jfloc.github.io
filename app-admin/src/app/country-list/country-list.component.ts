import { Component, OnInit } from "@angular/core";
import { CountryService } from "../services/countrydata.service";
import { Router } from "@angular/router";
import { Country } from "../models/country";

@Component({
  selector: "app-country-list",
  templateUrl: "./country-list.component.html",
  styleUrls: ["./country-list.component.css"],
  providers: [CountryService],
})
export class CountryListComponent implements OnInit {
  countries: Country[];
  message: string;
  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.message = "Searching for trips";
    this.countryService.getCountries().then((data) => {
      this.message = data.length > 0 ? "" : "No country found";
      this.countries = data;
    });
  }
}
