import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: any[];
  checkoutForm: any;
  constructor(
    private carService: CartService,
    private formBuilder: FormBuilder,
  ) {
    this.items = this.carService.getItems();

    //define variable for form data
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: '',
    });
  }

  onSubmit(customerData){
    console.warn("order has been submitted",customerData);

    this.items = this.carService.clearCart();
    this.checkoutForm.reset();
  }

  ngOnInit() {
  }

}
