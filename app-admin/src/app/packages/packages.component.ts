import { Component, HostListener, OnInit } from '@angular/core';
import { CountryService } from '../services/countrydata.service';
import { Country } from '../models/country';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css',
})
export class PackagesComponent implements OnInit {
  countries: Country[] = [];
  countryAdded: Country = { code: '', name: '' };
  showForm = false;
  private clickListener: ((event: MouseEvent) => void) | null = null;
  loggedIn: boolean = false;

  constructor(
    private countryService: CountryService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getCountries();
    this.isLoggedIn();
  }

  getCountries(): void {
    this.countryService.getCountries().subscribe({
      next: (countries: Country[]) => {
        this.countries = countries;
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
      },
    });
  }

  addCountries(): void {
    this.countryService.addCountry(this.countryAdded).subscribe({
      next: (formData: Country) => {
        this.countryAdded = formData;
      },
    });
  }

  isLoggedIn(): void {
    this.loggedIn = this.authenticationService.isLoggedIn();
    console.log('Logged in is ', this.loggedIn);
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (this.showForm) {
      console.log('show form is ', this.showForm);
      this.addClickListener();
    } else {
      this.removeClickListener();
    }
  }

  private addClickListener() {
    console.log('Adding click listener');
    this.clickListener = this.onClick.bind(this);
    document.addEventListener('click', this.clickListener);
  }

  private removeClickListener() {
    if (this.clickListener) {
      console.log('Removing click listener');
      document.removeEventListener('click', this.clickListener);
      this.clickListener = null;
    }
  }

  onClick(event: MouseEvent) {
    console.log('event target is ', event.target);
    let clickedOnValid: boolean = false;
    if (event.target) {
      const closestButton = (event.target as HTMLElement).closest(
        '.overlay, .formButton'
      );
      clickedOnValid = closestButton !== null;
    }

    if (!clickedOnValid && this.showForm && event.target) {
      this.showForm = false;
      this.removeClickListener();
    }
  }
}
