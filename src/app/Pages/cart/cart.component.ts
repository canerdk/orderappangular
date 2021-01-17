import { Component, OnInit } from '@angular/core';
import {CartService} from "../../Services/cart.service";
import {Service} from "../../Services/service";
import {formatDate} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any;
  cartTotal: any = [];
  sum: any;

  orderForm = this.fb.group({
    name: ['', [Validators.required]],
    street: ['', [Validators.required]],
    avenue: ['', [Validators.required]],
    neighborhood: ['', [Validators.required]],
    district: ['Çankaya'],
    city: ['Ankara'],
    phone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    note: [''],
    no: ['', [Validators.required]],
  });
  result: any;

  address: any;
  datetime: any;
  orders: any;


  constructor(private cartService: CartService,
              private service: Service,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.products = this.cartService.getOrders();
    for (let i = 0; i < this.products.length; i++){
      this.cartTotal.push(this.products[i].price * this.products[i].quantity);
    }
    this.sum = this.cartTotal.reduce((acc, cur) => acc + cur, 0);
    this.datetime = formatDate(new Date(), 'dd/MM/yyy HH:mm', 'en');
  }

  confirm() {
    this.addWithoutLoginUser();
  }

  addWithLoginUser(){

  }

  addWithoutLoginUser(){
    if (this.orderForm.valid){
      this.result = Object.assign({}, this.orderForm.value);
      const obj = {
        street: this.result.street,
        avenue: this.result.avenue,
        neighborhood: this.result.neighborhood,
        no: this.result.no,
        city: this.result.city,
        district: this.result.district
      }
      this.service.postAddress(obj).then((data) => {
        this.address = data;
        const obj = {
          name: this.result.name,
          phone: this.result.phone,
          createdDate: this.datetime,
          ipAddress: 'asdasd',
          status: 1,
          note: this.result.note,
          addressId: this.address.id
        }
        this.service.postOrder(obj).then((data) => {
          this.orders = data;
          for (let p of this.products){
            const obj = {
              name: p.name,
              price: p.price,
              quantity: p.quantity,
              orderId: this.orders.id
            }
            this.service.postOrderDetail(obj).then((data) => {

            });
          }
        });
        this.showMsg();
        this.orderForm.reset();
        localStorage.removeItem('orders');
        this.ngOnInit();
        setTimeout(() => {
          this.router.navigate(['/category']);
        }, 2000);
      });
    }else{
      this.toastr.warning('Lütfen formdaki kırmızı alanları uygun bir şekilde doldurunuz.');
    }
  }

  showMsg(){
    this.toastr.success('Siparişiniz başarıyla verildi, teşekkür ederiz.');
  }

}
