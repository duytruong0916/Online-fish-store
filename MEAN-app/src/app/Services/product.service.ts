import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
private get_URL:string ='string';
private Products:Object[];
private title;
private subtitle;
constructor(private http: HttpClient) { }


getProduct():Observable<{success:boolean, msg:string, product:[]}>{
  let params = new HttpParams()
  params.append('title', this.title)
  if(this.subtitle){
  params.append('subtitle', this.subtitle);
  return this.http.get<{success:boolean, msg:string, product:[]}>(`http://localhost:3000/api/product/${this.title}.${this.subtitle}`, {params: params})
  }
  return this.http.get<{success:boolean, msg:string, product:[]}>(`http://localhost:3000/api/product/${this.title}`, {params: params})
};

sendProduct(Products){
  this.Products = Products;
}
getURL(){
  return this.get_URL;
}
set_Title(title){
  this.title =title;
}
set_Title_Subtitle(title,subtitle){
  this.title = title;
  this.subtitle = subtitle;
}
postProduct(formdata):Observable<{success:boolean, msg:string, product:[]}>{
  return this.http.post<{success:boolean, msg:string, product:[]}>('http://localhost:3000/api/product/upload', formdata)
}

}
