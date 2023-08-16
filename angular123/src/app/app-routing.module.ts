//ng generate module app-routing --flat --module=app

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './store/product-list/product-list.component';
import { ProductDetailComponent } from './store/product-detail/product-detail.component';
import { CartComponent } from './store/cart/cart.component';
import { ShippingComponent } from './store/shipping/shipping.component';
import { HeroListComponent } from './hero/hero-list/hero-list.component';
import { DashboardComponent } from './hero/dashboard/dashboard.component';
import { HeroDetailComponent } from './hero/hero-detail/hero-detail.component';
import { BaseComponent } from './base/base.component';


const routes: Routes = [
  {path:"",component:ProductListComponent},
  {path:"products/:productId",component:ProductDetailComponent},
  {path:"cart",component:CartComponent},
  {path:"shipping",component: ShippingComponent},
  {path:"heros",component:HeroListComponent},
  {path:"detail/:id",component:HeroDetailComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"base",component:BaseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
