import { Component, OnInit } from '@angular/core';
import {products} from '../products'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products = products;

  share() {
    window.alert("share");
  }

  onNotify(){
    window.alert("notify");
  }

  constructor() { }

  ngOnInit() {
  }

}
