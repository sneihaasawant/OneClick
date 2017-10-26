import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  order;
  constructor(private _userService: UserService , private router: Router) { }

  ngOnInit() {
    this.order = [];
    this.getOrderDetails();
  }

  getOrderDetails() {
    this._userService.getOrderDetails()
    .then( order => this.order = order)
    .catch( err => console.log('get order details ', err));
  }


}
