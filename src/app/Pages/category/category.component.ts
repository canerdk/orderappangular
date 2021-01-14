import { Component, OnInit } from '@angular/core';
import {Service} from "../../Services/service";
import {Category} from "../../Models/Category";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: Category[];

  constructor(private service: Service,
              private router: Router) { }

  ngOnInit(): void {
    this.service.getCategory().then((data) => {
      this.category = data;
    })
  }

  detail(id){
    this.router.navigate(['product', id]);
  }

}
