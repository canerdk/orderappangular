import { Component, OnInit } from '@angular/core';
import {CartService} from "../../Services/cart.service";
import {Service} from "../../Services/service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any;
  cartTotal: any = [];
  sum: any;
  name: any;
  street: any;
  avenue: any;
  neighborhood: any;
  district: string = 'Çankaya';
  city: string = 'Ankara';
  phone: any;
  note: any;
  no: any;

  constructor(private cartService: CartService,
              private service: Service) { }

  ngOnInit(): void {
    this.products = this.cartService.getOrders();
    for (let i = 0; i < this.products.length; i++){
      this.cartTotal.push(this.products[i].price * this.products[i].quantity);
    }
    this.sum = this.cartTotal.reduce((acc, cur) => acc + cur, 0);
  }

  confirm(){
    const obj = {
      street: this.street,
      avenue: this.avenue,
      neighborhood: this.neighborhood,
      no: this.no,
      city: this.city,
      district: this.district
    }
    this.service.postAddress(obj).then((data) => {
      console.log(data);
    });
  }

  addWithLoginUser(){

  }

  addWithoutLoginUser(){

  }

}
