import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
brand: String ; bhistory; browseItemarr: Array<any>;
a: Array<any>;
  constructor(private _userService: UserService , private router: Router) { }

  ngOnInit() {
    this.browseItemarr = [];
    this.brand = '';
    this.getBrowsingHistory();
  }

  shopCloths(brand) {
    console.log('inside shopping', brand);
    this._userService.setBrand(brand);
    this.router.navigate(['/dashboard', 'shop-details']);
  }

  getBrowsingHistory() {
    this._userService.getBrowsingHistory()
    .then( (data) => {
      this.bhistory = data;
      for ( let i = 0 ; i < this.bhistory.length ; i++ ) {
        console.log(this.bhistory[i]);
        this._userService.getbrowsedItem(this.bhistory[i])
        .then( data1 => this.browseItemarr.push(data1) )
        .catch( err => console.log('getbrowse' , err));
      }
    } )
    .catch( err => console.log('Browse', err) );
  }


  itemdetails(itemId) {
    console.log('i am in itemdetails', itemId);
    this._userService.sendItemid(itemId)
    .then( () => console.log('added to browsing hisroty'))
    .catch( err => console.log('browsing history' , err) );
    this.router.navigate(['/dashboard', 'shop-details', 'item-details']);
  }

}
