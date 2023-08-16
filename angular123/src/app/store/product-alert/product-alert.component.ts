import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-alert',
  templateUrl: './product-alert.component.html',
  styleUrls: ['./product-alert.component.scss']
})
export class ProductAlertComponent implements OnInit {
  @Input() product;

  //创建事件发射器用于发送事件
  @Output() notify=new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
