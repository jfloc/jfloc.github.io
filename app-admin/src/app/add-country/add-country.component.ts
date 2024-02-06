import { Component } from "@angular/core";
import { CountryService } from "../services/countrydata.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-country",
  templateUrl: "./add-country.component.html",
  styleUrls: ["./add-country.component.css"],
})
export class AddCountryComponent {
  addForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      name: ["", Validators.required],
    });
  }

  addCountry() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.countryService
        .addCountry({ name: this.addForm.value })
        .then((data) => {
          console.log(data);
          this.router.navigate([""]);
        });
    }
  }
}
