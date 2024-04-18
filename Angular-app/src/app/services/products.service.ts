import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Product, Products } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: ApiService) { }
  getProducts = (url: string, params: PaginationParams): Observable<Products> => {
    return this.apiService.getItems<Products>(url, { params, responseType: 'json' });
  }

  addProduct = (url: string, body: Product): Observable<Product> => {
    return this.apiService.postItem<Product>(url, body, {});
  }

  updateProduct = (url: string, body: Product): Observable<Product> => {
    return this.apiService.putItem<Product>(url, body, {});
  }

  deleteProduct = (url: string): Observable<any> => {
    return this.apiService.deleteItem<any>(url, {});
  }
}
