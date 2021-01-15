import { Component, OnInit } from '@angular/core';
import {Service} from "../../Services/service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../Models/Product";
import {OrderdialogComponent} from "../../Dialogs/orderdialog/orderdialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CartService} from "../../Services/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product[];
  cartItems: any = [];

  constructor(private service: Service,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              public cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      const id = data.get('id');
      this.service.getProductsWithId(id).then((data) => {
        this.product = data;
      })
    });
    this.cartItems = this.cartService.getOrders();
  }

  addToCart(p){
    this.dialog.open(OrderdialogComponent, {
      minWidth: 350,
      data: {
        id: p.id,
        name: p.name,
        description: p.description,
        stock: p.stock,
        price: p.price
      }
    });
  }

  deleteTask(p) {
    this.cartService.deleteOrder(p);
  }

}
