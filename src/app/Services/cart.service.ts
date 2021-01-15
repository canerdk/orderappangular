import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  product: any = [];

  constructor() { }

  getOrders() {
    if (localStorage.getItem('orders') === null) {
      this.product = [];
    } else {
      this.product = JSON.parse(localStorage.getItem('orders'));
    }
    return this.product;
  }

  addOrder(order) {
    this.product.push(order);
    let products = [];
    if(localStorage.getItem('orders') === null) {
      products = [];
      products.push(order);
      localStorage.setItem('orders', JSON.stringify(products));
    } else {
      products = JSON.parse(localStorage.getItem('orders'));
      products.push(order);
      localStorage.setItem('orders', JSON.stringify(products));
    }
  }

  deleteOrder(order) {
    for (let i = 0; i < this.product.length; i++) {
      if (order === this.product[i]) {
        this.product.splice(i, 1);
        localStorage.setItem('orders', JSON.stringify(this.product));
      }
    }
  }
}
