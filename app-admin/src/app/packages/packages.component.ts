// Author: Joshua Flores
// Email: joshua.flores3@snhu.edu
// Date: 02/28/2024
// Version: 0.1.0
// Purpose: package component

import { Component, HostListener, OnInit } from '@angular/core';
import { CountryService } from '../services/countrydata.service';
import { RandGenService } from '../services/rand-gen.service';
import { Country } from '../models/country';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css',
})
export class PackagesComponent implements OnInit {
  countries: Country[] = [];
  countriesList: string[] = [];
  countryAdded: Country = { _id: '', code: '', name: '', imageUrl: '' };
  showForm = false;
  private clickListener: ((event: MouseEvent) => void) | null = null;
  loggedIn: boolean = false;
  isEditMode: boolean = false;
  editedCountry: Country = { _id: '', code: '', name: '', imageUrl: '' };

  constructor(
    private http: HttpClient,
    private randCodeGenerator: RandGenService,
    private countryService: CountryService,
    private authenticationService: AuthenticationService
  ) {}

  submitForm(): void {
    let formData: FormData;
    if (this.isEditMode && this.editedCountry) {
      console.log('edit mode in submitForm()');
      console.log('imgUrl', this.editedCountry.imageUrl);
      formData = this.countryService.createFormData(
        this.editedCountry._id,
        this.editedCountry.code,
        this.editedCountry.name,
        this.editedCountry.imageUrl,
        this.editedCountry.imageFile
          ? this.editedCountry.imageFile
          : new File([], '') // Provides a default empty file if imageFile is undefined
      );
      console.log('Formdata in submitform sent to updateCountry is');
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      this.updateCountry(formData);
    } else {
      this.addCountry(this.countryAdded.name);
    }
  }

  ngOnInit(): void {
    this.isLoggedIn();
    this.getCountries();
    this.http
      .get('./assets/countriesOrderedAlpha.csv', { responseType: 'text' })
      .subscribe({
        next: (data: string) => {
          this.parseCSV(data);
        },
        error: (error) => {
          console.error('Error fetching CSV:', error);
        },
      });
  }

  parseCSV(data: string): void {
    const rows = data.split('\n');
    for (let i = 1; i < rows.length; i++) {
      const columns = rows[i].split(',');
      if (columns.length >= 1) {
        this.countriesList.push(columns[0]);
      }
    }
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

  addCountry(countryName: string): void {
    this.randCodeGenerator.generateTravelPackageCode(countryName).subscribe({
      next: (code) => {
        console.log('Generated travel package code:', code);
        console.log('country imageurl is', this.countryAdded.imageUrl);
        const formData = this.countryService.createFormData(
          this.countryAdded._id,
          code,
          this.countryAdded.name,
          this.countryAdded.imageUrl,
          this.countryAdded.imageFile
            ? this.countryAdded.imageFile
            : new File([], 'default.jpg')
        );

        this.countryService.addCountry(formData).subscribe({
          next: (response: Country) => {
            this.countries.push(response);
            this.countryAdded = { _id: '', code: '', name: '', imageUrl: '' }; // Resets the form
            this.showForm = false; // Hides the form
          },
          error: (error) => {
            console.error('Error adding country:', error);
          },
        });
      },
      error: (error) => {
        console.error('Error generating travel package code:', error);
      },
    });
  }

  updateCountry(updatedData: FormData): void {
    if (this.editedCountry && this.editedCountry._id) {
      console.log('this.edited is ');
      console.log(this.editedCountry._id);
      console.log('edited country is:', this.editedCountry);
      console.log('update data is');
      updatedData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      this.countryService.updateCountry(updatedData).subscribe({
        next: (updatedCountry: Country) => {
          console.log('Updated country:', updatedCountry);
          // Updates the countries array with the updated country
          const index = this.countries.findIndex(
            (country) => country._id === updatedCountry._id
          );
          if (index !== -1) {
            this.countries[index] = updatedCountry;
          }
          // Resets the form and exit edit mode
          this.editedCountry = { _id: '', code: '', name: '', imageUrl: '' };
          this.isEditMode = false;
          this.showForm = false;
        },
        error: (error) => {
          console.error('Error updating country:', error);
        },
      });
    } else {
      console.error('No country selected for editing');
    }
  }

  isLoggedIn(): boolean {
    this.loggedIn = this.authenticationService.isLoggedIn();
    console.log('Logged in is ', this.loggedIn);
    return this.loggedIn;
  }

  // This finds the country using the imageUrl nearest to the edit button and searched to ensure that a country exists based on the countries image urls
  saveImageSrc(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const imgElement = target.previousElementSibling as HTMLImageElement;
    if (imgElement && imgElement.tagName === 'IMG') {
      const imageUrl = imgElement.src
        .replace(/^.*?\/\/.*?\/(uploads\/[^/]+)$/, '$1')
        .replace(/\//g, '\\');
      console.log('Logged imageUrl:', imageUrl);

      this.countries.forEach((c) =>
        console.log('Country imageUrl:', c.imageUrl)
      );
      console.log(imageUrl, 'C.imageurl is behind');
      const country = this.countries.find((c) => c.imageUrl === imageUrl);
      console.log('Found country:', country);

      if (country) {
        this.editedCountry = { ...country }; // Clones the country object to avoid direct modification
        console.log('Found edited country:', this.editedCountry);
        this.isEditMode = true;
        this.toggleForm();
      } else {
        console.error('Country not found for the given image URL');
      }
    } else {
      console.error('No imgElement found');
    }
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

  // file input for add button
  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      this.countryAdded.imageFile = target.files[0];
    }
  }

  // Used when edit is called
  handleFileInputEdit(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      const file = target.files[0];
      this.editedCountry.imageFile = file;

      console.log(
        'this edited country image file is $$$',
        this.editedCountry.imageFile,
        '\nUrl is',
        this.editedCountry.imageUrl
      );
    }
  }

  // This handles the click events so as to ensure that the event listeners are set and reset when necessary
  onClick(event: MouseEvent) {
    console.log('event target is ', event.target);
    let clickedOnValid: boolean = false;
    if (event.target) {
      const closestButton = (event.target as HTMLElement).closest(
        '.countryAddForm, .formButton'
      );
      clickedOnValid = closestButton !== null;
    }

    if (!clickedOnValid && this.showForm && event.target) {
      this.showForm = false;
      this.removeClickListener();
    }
  }
}
