//// Author: Joshua Flores
// Email: joshua.flores3@snhu.edu
// Date: 02/28/2024
// Version: 0.1.0
// Purpose: service that handles the crud operations

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country } from '../models/country';
import { BROWSER_STORAGE } from '../storage';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private apiBaseUrl = 'http://localhost:3000/api';
  private countryUrl = `${this.apiBaseUrl}/country/`;

  //C - Create operation
  public addCountry(formData: FormData): Observable<Country> {
    const httpOptions = this.getHttpOptions();

    console.log(
      'country token is ',
      httpOptions['headers'].get('Authorization')
    );

    console.log(formData);
    return this.http
      .post<Country>(this.countryUrl, formData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public addCountryWithData(
    _id: string,
    code: string,
    name: string,
    imageUrl: string,
    imageFile: File
  ): Observable<Country> {
    const formData = this.createFormData(_id, code, name, imageUrl, imageFile);
    return this.addCountry(formData);
  }

  public createFormData(
    _id: string,
    code: string,
    name: string,
    imageUrl: string,
    imageFile?: File
  ): FormData {
    const formData = new FormData();
    formData.append('_id', _id);
    formData.append('code', code);
    formData.append('name', name);

    if (imageFile) {
      formData.append('image', imageFile);
      formData.append('imageUrl', imageUrl);
    }
    return formData;
  }
  // R - Read data operations
  public getCountries(): Observable<Country[]> {
    console.log('countryUrl is ', this.countryUrl);
    return this.http
      .get<Country[]>(this.countryUrl)
      .pipe(catchError(this.handleError));
  }
  // U - Update data
  public updateCountry(updatedData: FormData): Observable<Country> {
    const httpOptions = this.getHttpOptions();
    const imgUrl = updatedData.get('_id'); // Get the country's name from FormData
    console.log('Your id updated is');
    console.log(imgUrl);
    const updateUrl = `${this.countryUrl}${imgUrl}`; // Use the ID in the URL
    return this.http
      .put<Country>(updateUrl, updatedData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // D - Delete data

  //Helper methods
  private getHttpOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getItem('travlr-token')}`,
      }),
    };
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}
