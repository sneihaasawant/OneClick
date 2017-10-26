import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Cart } from '../cart';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlist: Array<any>;
  watchlistArr: Array<any>;
  constructor(private _userService: UserService , private router: Router) { }

  ngOnInit() {
    this.watchlistArr = [];
    this.getwatchlist();
  }

  getwatchlist() {
    this._userService.getwatchlist()
    .then( (data) => {
      this.watchlist = data;
      for ( let i = 0 ; i < this.watchlist.length ; i++ ) {
        console.log(this.watchlist[i].productId);
        this._userService.getbrowsedItem(this.watchlist[i].productId)
        .then( data1 => this.watchlistArr.push(data1) )
        .catch( err => console.log('getwatch' , err));
      }
    })
    .catch( err => console.log('watchlist err', err) );
  }

  itemdetails(itemId) {
    console.log('i am in itemdetails', itemId);
    this._userService.sendItemid(itemId)
    .then( () => console.log('added to watch hisroty'))
    .catch( err => console.log('watch history' , err) );
    this.router.navigate(['/dashboard', 'shop-details', 'item-details']);
  }

}

