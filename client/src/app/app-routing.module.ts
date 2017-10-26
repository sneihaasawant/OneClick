
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailComponent } from './email/email.component';
import { DemoComponent } from './demo/demo.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
    children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'watchlist', component: WatchlistComponent},
    {path: 'cart', component: CartComponent}
    ]
  },
  {
    path: 'email',
    component: EmailComponent,
  },
   {
    path: 'dashboard/shop-details',
    component: ShopDetailsComponent,
    },
    {
      path: 'dashboard/shop-details/item-details',
      component: ItemDetailsComponent,
      },
      {
        path: '',
        component: DemoComponent,
      },
  {
    path: '**',
    redirectTo : '/'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
