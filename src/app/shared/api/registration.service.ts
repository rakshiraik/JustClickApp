import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Brand } from '../interfaces/brand';
import { Product } from '../interfaces/product';
import { ProductsList } from '../interfaces/list';
import { SerializedFilterValues } from '../interfaces/filter';
import { CommonService } from '../services/common.service';
import { CategorySourceDto } from '../ViewModels/CategorySourceDto'

import {
    getBestsellers,
    getFeatured,
    getLatestProducts,
    getProduct,
    getRelatedProducts,
    getSpecialOffers,
    getTopRated,
    getShopCategoriesBySlugs,
    getShopCategoriesTree,
    getShopCategory,
    getBrands,
    getProductsList,
} from '../../../fake-server';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { response } from 'express';


export interface ListOptions {
    page?: number;
    limit?: number;
    sort?: string;
    filterValues?: SerializedFilterValues;
}
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
export class RegistrationService {

    private url = this.commonService.getBaseUrlApi()+ "/Category";
    private urlproduct = this.commonService.getBaseUrlApi()+ "/Product";
private error:any;
    constructor(
        private http: HttpClient,private commonService: CommonService
    ) { 

    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
      this.error=error;
          // TODO: send the error to remote logging infrastructure
          //console.error(error); // log to console instead
      
          // TODO: better job of transforming error for user consumption
         // this.log(`${operation} failed: ${error.message}`);
      
          // Let the app keep running by returning an empty result.
          return error ;
        };
      }


    // getCategorySource(): Observable<CategorySourceDto[]> { 
    //     const url = this.url+'/getCategorySource'

       
    //     this.http.get<CategorySourceDto[]>('https://api.npms.io/v2/search?q=scope:angular').subscribe(data => {
    //         return data;
    //     })  

        getCategorySource(){
            const url = this.url+'/getCategorySource'
            return this.http.get(url).pipe(map((res: Response) => res));

            
        }


        getCategories(options?: IRequestOptions): Observable<any[]> {
       
            const headers = new HttpHeaders();
            const params = new HttpParams();
             return this.http.get<any[]>(this.url+'/getCategorySource', options);
      
        }


//         return this.http.get(url)
//  .pipe(map((res: Response) => res));
        // return this.http.get<CategorySourceDto[]>(url)  
        //     .pipe(map(
        //         res=>res.j);
        //         //.catch(this.handleError);
        //     // catchError(this.handleError<CategorySourceDto[]>('error'))
        // ; 
            
    







    /**
     * Returns a category tree.
     *
     * @param parent - If a parent is specified then its descendants will be returned.
     * @param depth  - Maximum depth of category tree.
     */
    // getCategories(parent: Partial<Category> = null, depth: number = 0, options?: IRequestOptions): Observable<Category[]> {
        postCategoriesForm(categoryRegistrationRequest, options?: IRequestOptions): Observable<any[]> {
            /**
             * This is what your API endpoint might look like:
             *
             * https://example.com/api/shop/categories.json?parent=latest-news&depth=1
             *
             * where:
             * - parent = parent.slug
             * - depth  = depth
             */
            // const params: {[param: string]: string} = {
            //     parent: parent.slug,
            //     depth: depth.toString(),
            // };
            const headers = new HttpHeaders();
            const params = new HttpParams();
             return this.http.post<any[]>(this.url, categoryRegistrationRequest, options);
            //return this.http.get<any[]>('http://localhost:11055/api/Bill/GetCategories', options);
    
            // This is for demonstration purposes only. Remove it and use the code above.
            //return getShopCategoriesTree(parent ? parent.slug : null, depth);
        }


        /**
     * Returns a category tree.
     *
     * @param parent - If a parent is specified then its descendants will be returned.
     * @param depth  - Maximum depth of category tree.
     */
    // getCategories(parent: Partial<Category> = null, depth: number = 0, options?: IRequestOptions): Observable<Category[]> {
        postCustomerForm(customerRegistrationRequest, options?: IRequestOptions): Observable<any[]> {
            /**
             * This is what your API endpoint might look like:
             *
             * https://example.com/api/shop/categories.json?parent=latest-news&depth=1
             *
             * where:
             * - parent = parent.slug
             * - depth  = depth
             */
            // const params: {[param: string]: string} = {
            //     parent: parent.slug,
            //     depth: depth.toString(),
            // };
            const headers = new HttpHeaders();
            const params = new HttpParams();
             return this.http.post<any[]>(environment.baseUrl+'/api/Customer', customerRegistrationRequest, options);
            //return this.http.get<any[]>('http://localhost:11055/api/Bill/GetCategories', options);
    
            // This is for demonstration purposes only. Remove it and use the code above.
            //return getShopCategoriesTree(parent ? parent.slug : null, depth);
        }

        /**
     * Returns a category tree.
     *
     * @param parent - If a parent is specified then its descendants will be returned.
     * @param depth  - Maximum depth of category tree.
     */
    // getCategories(parent: Partial<Category> = null, depth: number = 0, options?: IRequestOptions): Observable<Category[]> {
    postProductForm(productRegistrationRequest, options?: IRequestOptions) {
        const headers = new HttpHeaders();
        const params = new HttpParams();
        return this.http.post<any[]>(environment.baseUrl + '/api/Product', productRegistrationRequest, options);
    }

    postProductFormwithimage(files:any,productRegistrationRequest, options?: IRequestOptions){
        
        if (files.length === 0) {
            return;
          }
      
          const formData = new FormData();
      
          for (let file of files)
            formData.append("image", file,productRegistrationRequest.ProductName);
            formData.append("CategoryId",productRegistrationRequest.CategoryId);
            formData.append("Description",productRegistrationRequest.Description);
            formData.append("Features",productRegistrationRequest.Features);
            formData.append("Height",productRegistrationRequest.Height);
            formData.append("Length",productRegistrationRequest.Length);
            formData.append("Price",productRegistrationRequest.Price);
            formData.append("ProductName",productRegistrationRequest.ProductName);
            formData.append("Weight",productRegistrationRequest.Weight);
            formData.append("Width",productRegistrationRequest.Width);

          const uploadReq = new HttpRequest('POST', this.urlproduct + '/Product/PostProduct', formData,{reportProgress: true});
      
        //   this.http.request(uploadReq).subscribe(event => {
        //     if (event.type === HttpEventType.UploadProgress) {
            
        //     }
        //   });
        return this.http.post(this.urlproduct + '/PostProduct', formData).pipe(map((res) => 
        res//this.poststatus=(Poststatus)res.;
        ));
          

        // this.http
        // .post('http://localhost:64879' + '/api/Product/PostProduct', formData).subscribe(
        //     (response) => console.log(response),
        //     (error) => console.log(error)
        //   );

          

        //   return this.http.post('http://localhost:64879' + '/api/Product/PostProduct',formData)  
        //     .map((response: Response) => {  
        //       return response;                 
        //     }).catch(//this.handleError
        //         ); 



    }

}