import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getItems<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options);
  }

  postItem<T>(url: string, data: T, options: Options): Observable<T> {
    return this.httpClient.post<T>(url, data, options);
  }

  putItem<T>(url: string, data: T, options: Options): Observable<T> {
    return this.httpClient.put<T>(url, data, options);
  }
  deleteItem<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.delete<T>(url, options);
  }
}
