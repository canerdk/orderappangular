import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: any;

  constructor() { }


  addOrder(order) {
    this.products.push(order);
    let products = [];
    if(localStorage.getItem('orders') === null) {
      products = [];
      products.push(order);
      localStorage.setItem('orders', JSON.stringify(products));
    } else {
      products = JSON.parse(localStorage.getItem('tasks'));
      products.push(order);
      localStorage.setItem('orders', JSON.stringify(products));
    }
  }
}
