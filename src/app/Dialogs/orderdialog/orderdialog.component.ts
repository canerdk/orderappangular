import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CartService} from "../../Services/cart.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-orderdialog',
  templateUrl: './orderdialog.component.html',
  styleUrls: ['./orderdialog.component.css']
})
export class OrderdialogComponent implements OnInit {
  product: any;
  quantity: number = 1;
  totalPrice: any;

  constructor(public dialogRef: MatDialogRef<OrderdialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public addCart: CartService,
              private toastr: ToastrService) {
    this.product = data;
  }

  ngOnInit(): void {
    this.totalPrice = this.product.price * this.quantity;
  }

  changeQt(){
    this.totalPrice = this.product.price * this.quantity;
  }

  addProduct(p){
    this.dialogRef.afterClosed().subscribe(result => {
      if (result){
        const obj = {
          name: p.name,
          price: p.price,
          quantity: this.quantity
        };
        this.addCart.addOrder(obj);
        this.showToast(obj.quantity, obj.name);
      }
    });
  }

  showToast(qt, name){
    this.toastr.success(qt + ' adet ' + name + ' eklendi');
  }

}
