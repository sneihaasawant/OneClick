import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  user: User;
  constructor(private _userService: UserService , private router: Router) { }

  ngOnInit() {
    this.user = new User;
  }

  loginviaForm() {
    console.log(this.user);
    this._userService.create(this.user)
    .then( () => this.router.navigate(['dashboard']))
    .catch(err => console.log('login err:', err ));
}


}
