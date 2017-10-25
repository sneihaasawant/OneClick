import { Component, OnInit } from '@angular/core';

import { AuthService } from 'angular4-social-login';
import { SocialUser } from 'angular4-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';

import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  formuser: User;
  user: SocialUser;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.formuser = new User;
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  shop() {
    console.log('inside shop');
    this.router.navigate(['dashboard']);
  }

  email() {
    console.log('i aminside login');
    this.router.navigate(['email']);
  }

}
