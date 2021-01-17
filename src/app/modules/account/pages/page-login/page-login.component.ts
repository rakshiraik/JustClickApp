import { Component } from '@angular/core';
import {UserService } from '../../../../shared/services/user.service';
import { Login } from '../../../../shared/ViewModels/Login';

@Component({
    selector: 'app-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent {
    constructor(private loginService:UserService) { }

    login:Login;
    loginloadingVisible:boolean;

    ngOnInit() {
             
        this.login = new Login();

        if (true//!environment.production
            ) {

          // var user = this.route.snapshot.params['usertype'];
         //  this.login.usertype = user;
         //   this.login.tenantid = "1";
           // this.login.username = "admin";
            //this.login.remotelogid = "232";
            ///this.login.password = "262069";
        
           }
           else
       {
              
    // var user = this.route.snapshot.params['usertype'];
        // this.login.usertype = user;
        // if (this.loginService.decdata != undefined) {
             //this.isdisabled = true;
            //this.login.tenantid = this.loginService.urlDataDto.AisCustId;
            //this.login.username = this.loginService.urlDataDto.AppUserName;
            //this.login.remotelogid = this.loginService.urlDataDto.remotelogid;
         //this.platformLocation.onPopState(() => {               
            //this.loginService.decdata = undefined;             
            //this.platformLocation.back();
           // });
        }
    // else
    //    // {
            // this.isdisabled = false;
             //this.login.remotelogid = '232';
        // }
     }
     onSubmit() {
        this.loginService.login(this.login).subscribe(result=>{
            if(result){
                
            }
        })
    }

    OnLogin_click(){
        
    }
       
    }


    // if submit  button code

//     onSubmit() {
       
//             this.loginService.login(this.login)
//                 .subscribe(
//                     result => {
//                         if (result) {
//                             this.loginloadingVisible=false;
//                             if (this.loginService.decdata != undefined)  {
//                                 var url = this.loginService.urlDataDto.url;
//                             if(url==null)
//                             {
                              
//                                 this.router.navigate(['/Customer/CustomerHome']);
//                             }
//                             else
//                             {

// if(url=="/Admin/NewBranch/reg"){

//     this.router.navigate(['/Admin/NewBranch/reg',Entry.Create,this.loginService.urlDataDto.AisCustId]);

// }else{


//     var partymastid=this.loginService.urlDataDto.PartyMastId;
//     var AisCustId= this.loginService.urlDataDto.AisCustId;
//     this.validateAgent= new ValidateAgent();
//     this.validateAgent.PartyMastId=this.loginService.urlDataDto.PartyMastId;;
//     this.validateAgent.AisCustId=this.loginService.urlDataDto.AisCustId;
//     if(this.validateAgent.PartyMastId!==null && this.validateAgent.AisCustId!=null )
//     {
       
//         this.IsRegister(this.validateAgent);
//       //  this.router.navigate([url]);
//     }     


// }



//                             } 
//                             }
//                             else {
//                                 this.router.navigate(['', this.login.usertype]);
//                             }
//                         }
//                     },  
//                 error => this.errors = error);
        
//     }



