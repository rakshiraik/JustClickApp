import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { RootService } from 'src/app/shared/services/root.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/shared/api/registration.service';
import { CategorySourceDto } from '../../../../../../src/app/shared/ViewModels/CategorySourceDto'
import { CategoryService } from 'src/app/shared/api/category.service';
@Component({
    selector: 'app-categoryRegistration',
    templateUrl: './page-categoryRegistration.component.html',
    styleUrls: ['./page-categoryRegistration.component.scss']
})
export class PageCategoryRegistrationComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();
    public CategorySource:CategorySourceDto[];
    categoryRegistrationForm: FormGroup;
    errorMessage=false;
    displaymessage=false;
    errors: string[];
   
    messages: string[];


    constructor(
        public root: RootService, public formbuilder: FormBuilder,public categoryService:CategoryService,
        public cart: CartService, public registrationService: RegistrationService,
        private route: ActivatedRoute,
        private router: Router
    ) { 
        this.categoryRegistrationForm = this.formbuilder.group({//building the formgroup with formcontrolname.
            Date: new Date(),
            CategoryName: ['', [Validators.required]],
            ParentId: ['', [Validators.required]]
          });
    }

    ngOnInit(): void {
        // this.cart.quantity$.pipe(takeUntil(this.destroy$)).subscribe(quantity => {
        //     if (!quantity) {
        //         this.router.navigate(['../cart'], {relativeTo: this.route}).then();
        //     }
        // });

        this.categoryService.getCategorySource().subscribe((data: any) => {
            this.CategorySource=<any>data
           
        });

       // this.getCategorySource();
        
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getCategorySource() {  
        this.registrationService.getCategorySource().subscribe(res=>this.CategorySource=<any>res,
            error => this.errorMessage = <any>error
            );  
    } 

    OnSave_click() {
        var categoryRegistrationRequest={
            CategoryId:'',
            CategoryName: this.categoryRegistrationForm.controls['CategoryName'].value,
           
            CDT:Date.now(),
            EDT:Date.now(),
            UN:"",
            UID:"",
            ParentId: this.categoryRegistrationForm.controls['ParentId'].value
        }
        this.categoryService.postProductFormwithimage(categoryRegistrationRequest).subscribe((data: any) => {
           this.displaymessage=true;
           this.messages=null;
           this.errors=null;
            var ff = data;
            if((ff.code!=200)||(ff.code!=201)){
                this.errors=ff.message.split(",");
            }else{
                this.errors=ff.message.split(",");
            }
        });
    }
}
