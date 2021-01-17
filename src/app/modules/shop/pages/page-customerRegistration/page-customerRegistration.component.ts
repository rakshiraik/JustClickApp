import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { RootService } from 'src/app/shared/services/root.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RegistrationService } from 'src/app/shared/api/registration.service';

@Component({
    selector: 'app-customerRegistration',
    templateUrl: './page-customerRegistration.component.html',
    styleUrls: ['./page-customerRegistration.component.scss']
})
export class PageCustomerRegistrationComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();
    customerRegistrationForm: FormGroup;
    constructor(
        public root: RootService, public formbuilder: FormBuilder,
        public cart: CartService, public registrationService: RegistrationService,
        private route: ActivatedRoute,
        private router: Router
    ) { 
        this.customerRegistrationForm = this.formbuilder.group({//building the formgroup with formcontrolname.
            FirstName: ['rakshith', [Validators.required, Validators.minLength(3)]],
            LastName: ['rai', [Validators.required, Validators.minLength(3)]],
            CompanyName: ['IDS', [Validators.required, Validators.minLength(3)]],
            EMailID: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*"), Validators.minLength(6)]],
            Phone: ['8277033170', [Validators.required, Validators.minLength(10)]],
            Address1: ['Bappanadu', [Validators.required, Validators.minLength(3)]],
            Address2: ['Temple Street', [Validators.required, Validators.minLength(4)]],
            Address3: ['#4/5-2', [Validators.required, Validators.minLength(4)]],
            State: ['#4/5-2', [Validators.required, Validators.minLength(4)]],
            PinCode: ['574154', [Validators.required, Validators.minLength(6)]],
        });
    }

    ngOnInit(): void {
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

    OnSubmit_click(){
        var customerRegistrationRequest={
            FirstName:this.customerRegistrationForm.controls['FirstName'].value,
            LastName: this.customerRegistrationForm.controls['LastName'].value,
            CompanyName:this.customerRegistrationForm.controls['CompanyName'].value,
            Address1:this.customerRegistrationForm.controls['Address1'].value,
            Address2:this.customerRegistrationForm.controls['Address2'].value,
            Address3:this.customerRegistrationForm.controls['Address3'].value,
            State:this.customerRegistrationForm.controls['State'].value,
            PinCode:this.customerRegistrationForm.controls['PinCode'].value,
            EmailID:this.customerRegistrationForm.controls['EMailID'].value,
            Phone:this.customerRegistrationForm.controls['Phone'].value
        }
        this.registrationService.postCustomerForm(customerRegistrationRequest).subscribe((data: any) => {
            var ff = data;
        }); 
    }
}
