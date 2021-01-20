import { Component, OnInit } from '@angular/core';
import {CartService} from "../../Services/cart.service";
import {Service} from "../../Services/service";
import {formatDate} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import * as uuid from 'uuid';
import {LocationService} from "../../Services/location.service";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any;
  cartTotal: any = [];
  sum: any;
  ip: any;

  orderForm = this.fb.group({
    name: ['', [Validators.required]],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    note: ['']
  });
  result: any;

  address: any;
  datetime: any;
  orders: any;


  constructor(private cartService: CartService,
              private service: Service,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private location: LocationService) { }

  ngOnInit(): void {
    this.products = this.cartService.getOrders();
    this.service.getIPAddress().then((ip) => {
      this.ip = ip;
    });
    this.location.getPosition().then((data) => {
      console.log(data);
    })
    for (let i = 0; i < this.products.length; i++){
      this.cartTotal.push(this.products[i].price * this.products[i].quantity);
    }
    this.sum = this.cartTotal.reduce((acc, cur) => acc + cur, 0);
  }

   confirm() {
     this.addWithoutLoginUser();
  }

  addWithLoginUser(){

  }

   addWithoutLoginUser(){
    if (this.orderForm.valid){
      this.result = Object.assign({}, this.orderForm.value);
      const order = {
        name: this.result.name,
        phone: this.result.phone,
        createdDate: new Date(),
        ipAddress: this.ip.ip,
        status: 1,
        note: this.result.note,
        address: this.result.address
      }
      this.service.postOrder(order).then((data) => {
        this.orders = data;
        for (let i in this.products){
          const od = {
            name: this.products[i].name,
            price: this.products[i].price,
            quantity: this.products[i].quantity,
            orderId: this.orders.id
          }
          this.service.postOrderDetail(od).then((data) => {
             console.log(data);
          });
        }
      });
        // this.showMsg();
/*        this.orderForm.reset();
        localStorage.removeItem('orders');
        this.ngOnInit();*/
    }else{
      this.toastr.warning('Lütfen formdaki kırmızı alanları uygun bir şekilde doldurunuz.');
    }
  }

  showMsg(){
    this.toastr.success('Siparişiniz başarıyla verildi, teşekkür ederiz.');
  }

}
