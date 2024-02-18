import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country } from '../models/country';
import { BROWSER_STORAGE } from '../storage';
import { Observable, catchError, firstValueFrom } from 'rxjs';

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

  public getCountries(): Observable<Country[]> {
    return this.http
      .get<Country[]>(this.countryUrl)
      .pipe(catchError(this.handleError));
  }

  public addCountry(formData: Country): Observable<Country> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storage.getItem('travlr-token')}`,
      }),
    };

    console.log(
      'country token is ',
      httpOptions['headers'].get('Authorization')
    );

    console.log(formData);
    return this.http
      .post<Country>(this.countryUrl, formData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error; // You might choose to throw the error or handle it differently
  }
}
