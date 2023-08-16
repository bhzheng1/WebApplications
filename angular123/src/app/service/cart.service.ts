import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//服务可用于跨组件共享数据
@Injectable()
export class CartService {
  items=[];

  addToCart(product){
    this.items.push(product);
  }

  getItems(){
    return this.items;
  }

  clearCart(){
    this.items=[]
    return this.items;
  }

  getShippingPrice(){
    return this.http.get('/assets/shipping.json');
  }
  constructor(private http: HttpClient) { }
}
