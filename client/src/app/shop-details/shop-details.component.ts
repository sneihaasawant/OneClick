import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {
  clothes;
  constructor(private _userService: UserService , private router: Router) { }

  ngOnInit() {
    this.shopCloths();
  }

  shopCloths() {
    this._userService.getAllCloths()
    .then( (data) => {
      this.clothes  = data.items;
    })
    .catch( (err) => console.log('get all api data err', err) );
    // console.log(this._userService.query);
  }

  itemdetails(itemId) {
    console.log('i am in itemdetails', itemId);
    this._userService.sendItemid(itemId)
    .then( () => console.log('added to browsing hisroty'))
    .catch( err => console.log('browsing history' , err) );
    this.router.navigate(['/dashboard', 'shop-details', 'item-details']);
  }

}
