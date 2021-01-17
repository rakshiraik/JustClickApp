import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {
    
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();
    // loginForm: FormGroup;
    // constructor(public loginService:UserService, public formbuilder: FormBuilder) { 
    //     this.loginForm = this.formbuilder.group({//building the formgroup with formcontrolname.
    //         userName: ['rakshith', [Validators.required]],
    //         password: ['', [Validators.required]]
    //       }); 
    // }

    loginForm: FormGroup;

    constructor(public loginService:UserService, public formbuilder: FormBuilder) { 

        this.loginForm = this.formbuilder.group({//building the formgroup with formcontrolname.
            userName: ['rakshith', [Validators.required]],
            password: ['', [Validators.required]]
          }); 
    }

    onLogout_click(){
        this.loginService.authenticatedUser=false;
    }

    OnLogin_click() {
        var loginRequest={
            usertype:"",
            username: this.loginForm.controls['userName'].value,
            password:this.loginForm.controls['password'].value            
        } 
        this.loginService.login(loginRequest).subscribe(result=>{
            if(result){
                var hh=result;
                this.loginService.authenticatedUser=true;
            }
        })
    }

}
