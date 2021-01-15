import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import {MaterialModule} from "./Modules/material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Service} from "./Services/service";
import { CategoryComponent } from './Pages/category/category.component';
import { ProductComponent } from './Pages/product/product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {CartService} from "./Services/cart.service";
import { OrderdialogComponent } from './Dialogs/orderdialog/orderdialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    ProductComponent,
    OrderdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [Service, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
