import { Component, OnInit } from '@angular/core';
import {CartService} from "../../Services/cart.service";
import {Service} from "../../Services/service";
import {formatDate} from "@angular/common";


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
  address: any;
  datetime: any;
  orders: any;


  constructor(private cartService: CartService,
              private service: Service) { }

  ngOnInit(): void {
    this.products = this.cartService.getOrders();
    for (let i = 0; i < this.products.length; i++){
      this.cartTotal.push(this.products[i].price * this.products[i].quantity);
    }
    this.sum = this.cartTotal.reduce((acc, cur) => acc + cur, 0);
    this.datetime = formatDate(new Date(), 'dd/MM/yyy HH:mm', 'en');
  }

  confirm(){
    this.addWithoutLoginUser();
  }

  addWithLoginUser(){

  }

  addWithoutLoginUser(){
    const obj = {
      street: this.street,
      avenue: this.avenue,
      neighborhood: this.neighborhood,
      no: this.no,
      city: this.city,
      district: this.district
    }
    this.service.postAddress(obj).then((data) => {
      this.address = data;
      const obj = {
        name: this.name,
        phone: this.phone,
        createdDate: this.datetime,
        ipAddress: 'asdasd',
        status: 1,
        note: this.note,
        addressId: this.address.id
      }
      this.service.postOrder(obj).then((data) => {
        this.orders = data;
        console.log(this.orders)
        for (let p of this.products){
          const obj = {
            name: p.name,
            price: p.price,
            quantity: p.quantity,
            orderId: this.orders.id
          }
          this.service.postOrderDetail(obj).then((data) => {
            console.log(data);
          })
        }
      });
    });
  }

}
