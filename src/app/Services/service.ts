import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Category} from "../Models/Category";
import {Product} from "../Models/Product";

@Injectable({
  providedIn: 'root'
})
export class Service {
  BASE_URL = 'https://localhost:44300/api/';

  constructor(private http: HttpClient) { }

  async getCategory(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return await this.http.get<Category[]>(this.BASE_URL + 'categories', {headers}).toPromise();
  }

  async getProductsWithId(id){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return await this.http.get<Product[]>(this.BASE_URL + 'products/getbyid?categoryId=' + id, {headers}).toPromise();
  }
}
