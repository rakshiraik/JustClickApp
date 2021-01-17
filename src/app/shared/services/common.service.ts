
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable,Injector } from '@angular/core';
import { Router } from '@angular/router';
//import { Response } from '@angular/http';
//import { baseUrl } from '../app.config';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { errorHandler } from '@angular/platform-browser/src/browser';
import { NavigationError } from '@angular/router';
import {environment} from '../../../../src/environments/environment'
import { isObject } from 'util';
import { of, Subscription } from 'rxjs';
import{ErrorService} from "../services/error.service"
export class  ErrorData{
    errorMessage?:string;
    errorContainer?:ErrorContainer[];
    modelError?:ModelError[];
}

export class ModelError{
    Property:string;
    Error:string;
}

export class ErrorContainer{
    ErrorName : string;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private errorService: ErrorService) { }

  getBaseUrl(): string {
      return environment.baseUrl;
  }
  getBaseUrlApi(): string {
  return  environment.baseUrl + '/api';
  }


  public errorSuscription(subscription: Observable<any>) {
      subscription.subscribe((data: any) => {
        if (data.Errors != undefined) {
          for (var i = 0; i < data.Errors.length; i++) {
           var errorMessageObject={errorMessage:data.Errors[i].ErrorString};
           if(i==0) {
            var errorData = [{
              errorMessage: data.Errors[i].ErrorString
            }];
           }
            if(i>0){
              errorData.push(errorMessageObject);
            }
          }
          this.errorService.myErrorArraySubscription(errorData);
        }
      
      }, err => this.handleErrors(err, this.errorService));
    }
    private errorData: ErrorData;
    errors: ModelError[];
    error: ModelError;
    handleErrors(err: HttpErrorResponse, errorService: ErrorService) {
      if (err.status == 400) {
        if (isObject(err.error)) {
          this.errors = [];
          let validationErrorDictionary = err.error.errors;
          for (var fieldName in validationErrorDictionary) {
            if (validationErrorDictionary.hasOwnProperty(fieldName)) {
              this.error = {
                Property: fieldName,
                Error: validationErrorDictionary[fieldName][0]
              };
              this.errors.push(this.error);
            }
          }
          this.errorData = {
            modelError: this.errors,
          };
        }
        else {
          this.errorData = {
            errorMessage: err.error,
          };
        }
      }
      else if (err.status == 401) {
        this.errorData = {
          errorMessage: err.statusText,
        };
      }
      else if (err.status == 405) {
        this.errorData = {
          errorMessage: err.statusText,
        };
      }
      errorService.myErrorSubscription(this.errorData);
      return of(null);
    }
  handleError(error: HttpErrorResponse) {
      if (error.error instanceof Error) {
          var clienterror="'Client Side Error :'," +error.error.message;
          return observableThrowError(clienterror);
      } else {
          if (typeof error.error === "string") {
              var servererror="'Server Side Error :',"+error.error;
              return observableThrowError(servererror);
          }
          else{
            var Exeptionmessage="";
            var InnerExceptionmessage="";
            if(typeof error.error.InnerException!='undefined' && error.error.InnerException.ExceptionMessage){
              
              InnerExceptionmessage=error.error.InnerException.ExceptionMessage;
            
            }

            if(typeof error.error.ExceptionMessage!='undefined' && error.error.ExceptionMessage){
            
              Exeptionmessage=error.error.ExceptionMessage;
            
            }
            var servererror="'Server side Exception Occured :',"+Exeptionmessage+","+InnerExceptionmessage;
           //   var servererror="'Server side Exception Occured :',"+error.error.InnerException.ExceptionMessage+","+error.error.ExceptionMessage;
              return observableThrowError(servererror);
          }         
      }
  }
}
