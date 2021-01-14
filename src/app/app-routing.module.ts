import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./Pages/home/home.component";
import {CategoryComponent} from "./Pages/category/category.component";
import {ProductComponent} from "./Pages/product/product.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'product/:id', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
