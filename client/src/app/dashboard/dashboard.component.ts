import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
brand: String ;
a: Array<any>;
  constructor(private _userService: UserService , private router: Router) { }

  ngOnInit() {
    this.brand = '';
  }

  shopCloths(brand) {
    console.log('inside shopping', brand);
    this._userService.setBrand(brand);
    this.router.navigate(['/dashboard', 'shop-details']);
  }

}
