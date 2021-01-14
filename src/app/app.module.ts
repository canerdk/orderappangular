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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
