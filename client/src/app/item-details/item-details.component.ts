import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Item } from '../item';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  item: Item; productid; count;
  constructor(private _userService: UserService , private router: Router) { }

  ngOnInit() {
    this.item = new Item;
    this.getItem();
    this.getwatchdetails();
  }

  getItem() {
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

  addToCart() {
    console.log('Inside add to cart');
  }

  addToWatchlist() {
    console.log('Inside add to watchlist');
    console.log(this.productid);
    this._userService.addToWatchlist(this.productid)
    .then( () => console.log('product added sucessfully'))
    .catch( err => console.log('add watchlist', err));
  }


}
