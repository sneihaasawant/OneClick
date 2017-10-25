
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailComponent } from './email/email.component';
import { DemoComponent } from './demo/demo.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { ItemDetailsComponent } from './item-details/item-details.component';



const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
  },
  {
  path: 'dashboard',
  component: DashboardComponent,
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
    path: '**',
    redirectTo : '/'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
