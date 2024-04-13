import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, RatingModule, ButtonModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {
  //Update the value in parent component with double binding.
  @Input() display: boolean = false;
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() header!: string;
  @Output() confirmAdd: EventEmitter<Product> = new EventEmitter<Product>();

  @Input() product: Product = {
    name: '',
    image: '',
    price: 0,
    rating: 0
  }

  onConfirm() {
    this.confirmAdd.emit(this.product);
    this.display = false;
    this.displayChange.emit(this.display);
  }
  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
