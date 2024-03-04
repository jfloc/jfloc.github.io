import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root',
})
export class RandGenService {
  private csvUrl = './assets/topcountries.csv';
  constructor(private http: HttpClient) {}

  public generateRandomString(length: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomString = '';
    randomString = this.addToString(charset, randomString);
    /////////////////////////////////////////////////////////////
    // second half will generate random 0-9 string of length 3//
    ///////////////////////////////////////////////////////////
    const intDigitList = '0123456789';

    randomString = this.addToString(intDigitList, randomString);

    return randomString;
  }

  public searchCountry(countryName: string): Observable<string[]> {
    return new Observable<string[]>((observer) => {
      this.http.get(this.csvUrl, { responseType: 'text' }).subscribe({
        next: (csvData) => {
          const results = Papa.parse(csvData, {
            header: true,
            dynamicTyping: true,
          });
          const countries = results.data as {
            'Country Name': string;
            'ISO 3166-1 3-Letter Code': string;
          }[];
          const country = countries.find(
            (c) => c['Country Name'] === countryName
          );
          if (country) {
            observer.next([
              country['Country Name'],
              country['ISO 3166-1 3-Letter Code'],
            ]);
          } else {
            observer.error(`Country '${countryName}' not found.`);
          }
        },
        error: (error) => {
          observer.error(`Error reading CSV file: ${error}`);
        },
        complete: () => {
          observer.complete();
        },
      });
    });
  }

  public generateTravelPackageCode(countryName: string): Observable<string> {
    return new Observable<string>((observer) => {
      this.searchCountry(countryName).subscribe({
        next: ([_, countryCode]) => {
          const randomCharString = this.generateRandomString(3);
          observer.next(`${countryCode}${randomCharString}`);
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }

  // Random string of length=(2*n) and composed by (n) alphanumeric characters + (n) int characters
  private addToString(charset: string, stringIn: string): string {
    let randomString = '';
    const values = new Uint32Array(3);
    console.log('values are', values);
    let randvalues = window.crypto.getRandomValues(values);
    console.log('randvalues are', randvalues);
    for (let i = 0; i < 3; i++) {
      let valueCalced = values[i] % charset.length;
      console.log(valueCalced);
      randomString += charset[values[i] % charset.length];
    }
    stringIn += randomString;
    console.log('console.log is', stringIn);
    return stringIn;
  }
}
