import { Component } from '@angular/core';
import { CurrencyService } from '../../../../shared/services/currency.service';
import {UserService } from '../../../../shared/services/user.service';

@Component({
    selector: 'app-header-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
    languages = [
        {name: 'English', image: 'language-1'},
        {name: 'French',  image: 'language-2'},
        {name: 'German',  image: 'language-3'},
        {name: 'Russian', image: 'language-4'},
        {name: 'Italian', image: 'language-5'}
    ];

    currencies = [
        {name: '€ Euro',           url: '', code: 'EUR', symbol: '€'},
        {name: '£ Pound Sterling', url: '', code: 'GBP', symbol: '£'},
        {name: '$ US Dollar',      url: '', code: 'USD', symbol: '$'},
        {name: '₽ Russian Ruble',  url: '', code: 'RUB', symbol: '₽'}
    ];

islogin:boolean;

    constructor(
        public currencyService: CurrencyService,private loginService:UserService
    ) { 


      this.islogin=  loginService.isAuthenticated();
    }

    
    setCurrency(currency): void {
        this.currencyService.options = {
            code: currency.code,
            display: currency.symbol,
        };
    }
}
