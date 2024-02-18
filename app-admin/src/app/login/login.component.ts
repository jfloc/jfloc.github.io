import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class LoginComponent implements OnInit {
  public formError: string = '';
  public credentials = { name: '', email: '', password: '' };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doLogin();
    }
  }
  private doLogin(): void {
    console.log('Doing credentials');
    console.log('This.credentials is ', this.credentials);

    this.authenticationService.login(this.credentials).subscribe({
      next: (result) => {
        console.log('The following is the result');
        console.log(result);
        this.router.navigateByUrl('login');
      },
      error: (error) => {
        console.log('error buddy');
        this.formError = error; // Assuming error is a string message
      },
    });
  }
}
