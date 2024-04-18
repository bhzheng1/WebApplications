import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductComponent, PaginatorModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private productsService: ProductsService) { }

  @ViewChild('paginator') paginator: Paginator | undefined;


  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 10;
  displayEditPopup: boolean = false;
  displayAddProduct: boolean = false;
  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: 0,
    rating: 0
  }
  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }
    this.deleteProduct(product.id);
  }

  toggleAddPopup() {
    this.displayAddProduct = true;
  }

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return;
    }
    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddProduct = false;
  }

  onProductOutput = (product: Product) => {
    console.log(product);
  }

  onPageChange = (event: any) => {
    this.fetchProducts(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }
  fetchProducts(page: number, perPage: number) {
    this.productsService.getProducts("http://localhost:3000/clothes", { page, perPage }).subscribe(
      {
        next: (products: Products) => {
          this.products = products.items;
          this.totalRecords = products.total;
        },
        error: (error: any) => {
          console.log(error);
        }
      }
    )
  };

  editProduct(product: Product, id: number) {
    this.productsService.updateProduct("http://localhost:3000/clothes/" + id, product).subscribe({
      next: (product: Product) => {
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  addProduct(product: Product) {
    this.productsService.addProduct("http://localhost:3000/clothes", product).subscribe({
      next: (product: Product) => {
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct("http://localhost:3000/clothes/" + id).subscribe({
      next: (product: Product) => {
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}