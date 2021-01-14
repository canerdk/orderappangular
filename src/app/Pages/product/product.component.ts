import { Component, OnInit } from '@angular/core';
import {Service} from "../../Services/service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../Models/Product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product[];

  constructor(private service: Service,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      const id = data.get('id');
      this.service.getProductsWithId(id).then((data) => {
        this.product = data;
      })
    })
  }

  addToCart(p){
    console.log(p);
  }

}
