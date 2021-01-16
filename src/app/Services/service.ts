import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Category} from "../Models/Category";
import {Product} from "../Models/Product";
import {Address} from "../Models/Address";
import {Order} from "../Models/Order";
import {OrderDetail} from "../Models/OrderDetail";

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

  async postAddress(address){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return await this.http.post<Address[]>(this.BASE_URL + 'address', address,{headers}).toPromise();
  }

  async postOrder(order){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return await this.http.post<Order[]>(this.BASE_URL + 'orders', order,{headers}).toPromise();
  }

  async postOrderDetail(od){
    console.log(od);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return await this.http.post<OrderDetail[]>(this.BASE_URL + 'orderdetails', od,{headers}).toPromise();
  }

}
