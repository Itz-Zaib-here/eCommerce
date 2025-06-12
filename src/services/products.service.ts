import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { products } from '../app/models/model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // private apiUrl = 'https://projectapi.gerasim.in/api/';

  constructor(private http: HttpClient) { }
  // getProducts():Observable<products[]> {
  //   return this.http.get('/api/Products?page=1&pageSize=100');
  // }
  saveProduct(obj:products):Observable<products> {
    return this.http.post<products>('/api/Products', obj);
  }
    updateProduct(obj:products):Observable<products> {
    return this.http.put<products>('/api/Products', obj);
  }

}
