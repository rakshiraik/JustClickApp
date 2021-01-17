import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../services/common.service';
import { Product } from '../interfaces/product';
export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = this.commonService.getBaseUrlApi()+ "/Product";
  constructor( private http: HttpClient,private commonService: CommonService) { }


  getfeaturedProducts(options?: IRequestOptions): Observable<Product[]> {


    
       
    const headers = new HttpHeaders();
    const params = new HttpParams();
    //update
     return this.http.get<Product[]>(this.url+'/getfeaturedProducts', options);

}

}
