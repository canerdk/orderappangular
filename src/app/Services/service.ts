import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Category} from "../Models/Category";

@Injectable({
  providedIn: 'root'
})
export class Service {
  BASE_URL = 'https://localhost:44300/api/';

  constructor(private http: HttpClient) { }

  async getCategory(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return await this.http.get<Category[]>(this.BASE_URL + 'Categories', {headers}).toPromise();
  }
}
