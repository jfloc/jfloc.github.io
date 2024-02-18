import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isHomePage: boolean = true;

  isLoggedIn = function (): boolean {
    return true;
  };

  constructor(private router: Router) {
    // Determine if current route is home page
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd) // Filter to NavigationEnd events
      )
      .subscribe((event) => {
        // Update isHomePage based on the current URL
        this.isHomePage = this.router.url == '/';
        console.log('this.isHomePage is ', this.isHomePage);
      });
  }

  checkPage(): boolean {
    return this.isHomePage;
  }
}
