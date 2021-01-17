import { Component, OnDestroy, OnInit , HostBinding} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { RootService } from 'src/app/shared/services/root.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/shared/api/registration.service';
import { ShopService } from '../../../../shared/api/shop.service';
import { Category } from '../../../../shared/interfaces/category';

export type CategoryWithDepth = Category & {depth: number};

@Component({
    selector: 'app-productRegistration',
    templateUrl: './page-productRegistration.component.html',
    styleUrls: ['./page-productRegistration.component.scss']
})



export class PageProductRegistrationComponent implements OnInit, OnDestroy {
    file: any;
    private destroy$: Subject<void> = new Subject();
    productRegistrationForm: FormGroup;
    errorMessage=false;
    displaymessage=false;
    errors: string[];
   
    messages: string[];
    @HostBinding('class.search--suggestions-open') classSearchSuggestionsOpen = false;
    categories: CategoryWithDepth[] = [];
    constructor(
        public root: RootService, public formbuilder: FormBuilder,
        public cart: CartService, public registrationService: RegistrationService,
        private route: ActivatedRoute,
        private router: Router,private shopService:ShopService
    ) { 
        this.productRegistrationForm = this.formbuilder.group({//building the formgroup with formcontrolname.
            ProductName: ['Geeser', [Validators.required, Validators.minLength(3)]],
            CategoryId: ['#c7', [Validators.required, Validators.minLength(3)]],
            Price: ['', [Validators.required, Validators.minLength(3)]],
            Width: ['22', [Validators.required, Validators.minLength(6)]],
            Length: ['82', [Validators.required, Validators.minLength(10)]],
            Weight: ['5', [Validators.required, Validators.minLength(3)]],
            Height: ['20', [Validators.required, Validators.minLength(4)]],
            Description: ['#4/5-2', [Validators.required, Validators.minLength(4)]],
            Features: ['#4/5-2', [Validators.required, Validators.minLength(4)]]
        });

    }

    ngOnInit(): void {

        this.shopService.getCategories().subscribe((data: any) => {
            this.categories = data;
           
        });
        // this.cart.quantity$.pipe(takeUntil(this.destroy$)).subscribe(quantity => {
        //     if (!quantity) {
        //         this.router.navigate(['../cart'], {relativeTo: this.route}).then();
        //     }
        // });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    getCategoryName(category: CategoryWithDepth): string {
        return '&nbsp;'.repeat(category.depth * 4) + category.categoryName;
    }
    closeSuggestion(): void {
        this.classSearchSuggestionsOpen = false;
    }

    onSelectFile($event, file) {
        this.file = file;
      }




    OnSubmit_click(){
        var productRegistrationRequest={
            ProductName:this.productRegistrationForm.controls['ProductName'].value,
            CategoryId: this.productRegistrationForm.controls['CategoryId'].value,
            Price:this.productRegistrationForm.controls['Price'].value,
            Width:this.productRegistrationForm.controls['Width'].value,
            Length:this.productRegistrationForm.controls['Length'].value,
            Weight:this.productRegistrationForm.controls['Weight'].value,
            Height:this.productRegistrationForm.controls['Height'].value,
            Description:this.productRegistrationForm.controls['Description'].value,
            Features:this.productRegistrationForm.controls['Features'].value
        }
        this.registrationService.postProductFormwithimage(this.file,productRegistrationRequest).subscribe((data: any) => {
            var ff = data;

            if((ff.code!=200)||(ff.code!=201)){
                this.errors=ff.message.split(",");
            }else{
                this.errors=ff.message.split(",");
            }
        });
    }
}
