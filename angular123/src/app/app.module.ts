//用于引用一些在其他文件中定义好的公用的方法，数据模型，这是JavaScript的方式
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductAlertComponent } from './store/product-alert/product-alert.component';
import { ProductDetailComponent } from './store/product-detail/product-detail.component';
import { ProductListComponent } from './store/product-list/product-list.component';
import { ServiceModule, InMemoryHeroService } from './service/service.module';
import { CartComponent } from './store/cart/cart.component';
import { ShippingComponent } from './store/shipping/shipping.component';
import { HeroListComponent } from './hero/hero-list/hero-list.component';
import { HeroDetailComponent } from './hero/hero-detail/hero-detail.component';
import { MessagesComponent } from './hero/messages/messages.component';
import { DashboardComponent } from './hero/dashboard/dashboard.component';
import { BaseComponent } from './base/base.component';
import { HeroSearchComponent } from './hero/hero-search/hero-search.component';

@NgModule({
  //声明本模块中拥有的视图类，Angular有三种视图类：组件、指令和管道
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductAlertComponent,
    ProductDetailComponent,
    ProductListComponent,
    CartComponent,
    ShippingComponent,
    HeroListComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    BaseComponent,
    HeroSearchComponent,
  ],

  //declarations的子集，可用于其它模块的组件模板。（用来控制将哪些内部成员暴露给外部使用。
  //导入一个module并不意味着会自动导入这个module内部导入的module所暴露出的公共成员。
  //除非导入的这个module把它内部导入的module写到exports中。）
 exports:[],


  //本模块声明的组件模板需要的类所在的其它模块
  //导入其他module，其它module暴露的出的Components、Directives、Pipes等可以在本module的组件中被使用。
  //比如导入CommonModule后就可以使用NgIf、NgFor等指令。
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceModule.forRoot(),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryHeroService,{dataEncapsulation:false}),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],

  //服务的创建者，并加入到全局服务列表中，可用于应用任何部分。
  //指定应用程序基本需要使用的service
  //angular2+中没有模块级别service，所有在NgModule中声明的provider都是注册到根级别的Dependence Injector中
  providers: [],

  //指定应用的主视图（称为根组件），它是所有其它视图的宿主，只有根模块才能设置bootstrap通常是app启动的根组件，一般里边只有一个component。
  //bootstrap中的组件会自动被放入到entryComponents中。
  bootstrap: [AppComponent],

  //不会再模板中被引用到的组件。
  //这个属性一般情况下只有ng自己使用，一般是bootstrap组件或者路由组件，ng会自动把bootstrap、路由组件放入其中。
  //除非不通过路由动态将component加入到dom中，否则不会用到这个属性。
  entryComponents:[]
})
export class AppModule { }
