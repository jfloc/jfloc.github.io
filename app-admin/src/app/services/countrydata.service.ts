// countrydata.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Country } from "../models/country";

@Injectable({
  providedIn: "root",
})
export class CountryService {
  private apiUrl = "http://localhost:3000/api/countries";

  constructor(private http: HttpClient) {}

  public getCountries(): Promise<Country[]> {
    return this.http
      .get(this.apiUrl)
      .toPromise()
      .then((response) => response as Country[])
      .catch(this.handleError);
  }

  public addCountry(formData: Country): Promise<Country> {
    return this.http
      .post(this.apiUrl, formData)
      .toPromise()
      .then((response) => response as Country[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("Something has gone wrong", error);
    return Promise.reject(error.message || error);
  }
}
