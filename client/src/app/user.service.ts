import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './user';
import { Cart } from './cart';

@Injectable()
export class UserService {
  new_user: User;  data; query;
  brand; itemId;
  constructor(private _http: Http) { }

  create(new_user) {
    return this._http.post('/login', new_user).map(data => data.json()).toPromise();
  }

  get_all() {
    return this._http.get('/get_all_users').map(data => data.json()).toPromise();
  }

  am_i_logged_in() {
    return this._http.get('/am_i_logged_in').map(data => data.json()).toPromise();
  }
  setBrand(brand: String) {
    this.brand = brand;
  }

  getAllCloths() {
    console.log(this.brand);
    // tslint:disable-next-line:max-line-length
    return this._http.get(`http://api.walmartlabs.com/v1/search?apiKey=sx3fqu6hgy2rmy4ewfjshgar&query=women+cloth&facet=on&facet.filter=brand:${this.brand}`).map(data => data.json()).toPromise();
  }

  sendItemid(itemId) {
    this.itemId = itemId;
    return this._http.post('/addToBrowse', { productid : this.itemId }).map(data => data.json()).toPromise();
   }

  getItemDetails() {
    // tslint:disable-next-line:max-line-length
    return this._http.get(`http://api.walmartlabs.com/v1/items/${this.itemId}?format=json&apiKey=sx3fqu6hgy2rmy4ewfjshgar`).map(data => data.json()).toPromise();
  }

  addToWatchlist(productid: String) {
    return this._http.post('/addToWatchlist', { productid : productid }).map(data => data.json()).toPromise();
  }

  getwatchdetails() {
    return this._http.post('/getwatchdetails', { productid : this.itemId }).map(data => data.json()).toPromise();
  }

  getBrowsingHistory() {
    return this._http.get('/getBrowsingHistory').map(data => data.json()).toPromise();
  }

  getbrowsedItem (bhistoryid: string) {
    // tslint:disable-next-line:max-line-length
    return this._http.get(`http://api.walmartlabs.com/v1/items/${bhistoryid}?format=json&apiKey=sx3fqu6hgy2rmy4ewfjshgar`).map(data => data.json()).toPromise();
  }
  getwatchlist() {
    return this._http.get('/getwatchlist').map(data => data.json()).toPromise();
  }

  addtoCart(cart: Cart) {
        return this._http.post('/addtoCart', cart).map(data => data.json()).toPromise();
  }

  getOrderDetails(){
    return this._http.get('/getOrderDetails').map(data => data.json()).toPromise();
  }

}
