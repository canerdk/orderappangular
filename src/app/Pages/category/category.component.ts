import { Component, OnInit } from '@angular/core';
import {Service} from "../../Services/service";
import {Category} from "../../Models/Category";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: Category[];

  constructor(private service: Service) { }

  ngOnInit(): void {
    this.service.getCategory().then((data) => {
      this.category = data;
    })
  }

}
