import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '644941242889-b81v5p8u4705c2d9ngdvncegmp4hl7m5.apps.googleusercontent.com',
      callback: (response: any) => {
        this.handleLogin(response);
      },
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 200,
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      //decode
      const payload = this.decodeToken(response.credential);
      //store it in session
      sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
      // navigate to home/browse page
      this.router.navigate(['browse']);
    }
  }
}
