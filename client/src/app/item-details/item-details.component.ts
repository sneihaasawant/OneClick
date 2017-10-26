import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Item } from '../item';
import { Cart } from '../cart';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  item: Item; productid; count;   cart: Cart; item1: Item;
  constructor(private _userService: UserService , private router: Router) { }

  ngOnInit() {
    this.item = new Item;
    this.getItem();
    this.getwatchdetails();
  }

  getItem() {
    this.cart = new Cart();
    this._userService.getItemDetails()
    .then( (data) => {
      this.item  = data;
      this.productid = data.itemId;
   })
    .catch( (err) => console.log('get  item data err', err) );
  }

  getwatchdetails() {
    console.log(this.productid);
    this._userService.getwatchdetails()
    .then( (count) => this.count = count )
    .catch( err => console.log('get watchlist error' , err) );
  }

  addToCart(item) {
    console.log('Inside add to cart');
    this.cart.itemId = this.productid;
    this.cart.name = this.item.name;
    this.cart.size = this.item.size;
    this.cart.color = this.item.color;
    this.cart.salePrice = this.item.salePrice;
    this.cart.quantity = this.item.quantity;
    this._userService.addtoCart(this.cart)
    .then( () => console.log('cart added sucessfully'))
    .catch( err => console.log('cart add err', err));
    this.router.navigate(['/dashboard', 'shop-details'] );
  }

  addToWatchlist() {
    console.log('Inside add to watchlist');
    console.log(this.productid);
    this._userService.addToWatchlist(this.productid)
    .then( () => console.log('product added sucessfully'))
    .catch( err => console.log('add watchlist', err));
  }


}
