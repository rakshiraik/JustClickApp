import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
//import { po} from '../../../../../../src/app/shared/ViewModels/Poststatus'
import { Poststatus} from '../ViewModels/Poststatus'




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
export class CategoryService {
  poststatus:Poststatus;
  constructor(private http: HttpClient,private commonService:CommonService) { }

  private url = this.commonService.getBaseUrlApi()+ "/Category";
  getCategorySource(){
    const url = this.url+'/getCategorySource'
    return this.http.get(url).pipe(map((res: Response) => res));

    
}



postProductFormwithimage(productRegistrationRequest, options?: IRequestOptions) {
        


    const formData = new FormData();

    //for (let file of files)
     // formData.append("image", file,productRegistrationRequest.ProductName);
     formData.append("CategoryName",productRegistrationRequest.CategoryName);
     formData.append("ParentId",productRegistrationRequest.ParentId);

    const uploadReq = new HttpRequest('POST', this.url + '/PostCategory', formData,{reportProgress: true});

    // this.http.request(uploadReq).subscribe(message => {
    //   return message;

    // });


    return this.http.post(this.url + '/PostCategory', formData).pipe(map((res) => 
    res//this.poststatus=(Poststatus)res.;
    ));
 //return;
}

    

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
