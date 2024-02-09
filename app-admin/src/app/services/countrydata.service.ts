import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'http://localhost:3000/api/countries';

  constructor(private http: HttpClient) {}

  public getCountries(): Promise<Country[]> {
    return this.http
      .get<Country[]>(this.apiUrl)
      .toPromise()
      .catch(this.handleError);
  }

  public addCountry(formData: Country): Promise<Country> {
    return this.http
      .post<Country>(this.apiUrl, formData)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred:', error);
    return Promise.reject(error.message || error);
  }
}
