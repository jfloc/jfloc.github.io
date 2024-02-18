import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { CountryService } from './countrydata.service';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private countryDataService: CountryService
  ) {}

  private apiBaseUrl = 'http://localhost:3000/api/';

  public getToken(): string {
    const token: string | null = this.storage.getItem('travlr-token');
    if (token !== null) {
      return token; // Safe to return token as it's not null
    } else {
      throw new Error('Token is null'); // Handle the case where the token is null
    }
  }

  public saveToken(token: string): void {
    console.log('this is the token', token);
    this.storage.setItem('travlr-token', token);
  }

  public login(user: User): Observable<any> {
    return this.makeAuthApiCall('login', user).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  public register(user: User): Observable<any> {
    return this.makeAuthApiCall('register', user);
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private makeAuthApiCall(
    urlPath: string,
    user: User
  ): Observable<AuthResponse> {
    console.log('makeAuthApiCall');
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http.post<AuthResponse>(url, user);
  }

  public getCurrentUser(): User | undefined {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    } else {
      return undefined;
    }
  }
}
