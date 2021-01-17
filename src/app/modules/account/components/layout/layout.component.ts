import { Component } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.sass']
})
export class LayoutComponent {
    links: {label: string; url: string}[] = [
        {label: 'Customer Registration',     url: '/shop/cart/customerRegistration'},
        {label: 'Product Registration',     url: '/shop/cart/productRegistration'},
        {label: 'Category Registration',     url: '/shop/cart/categoryRegistration'},
        {label: 'Login',        url: '/account/login'},
        {label: 'Dashboard', url: './dashboard'},
        {label: 'Category', url: './CategoryList'},
        {label: 'Product', url: './ProductList'},
        // {label: 'Edit Profile', url: './profile'},
        // {label: 'Order History', url: './orders'},
        // {label: 'Order Details', url: './orders/5'},
        // {label: 'Addresses', url: './addresses'},
        // {label: 'Edit Address', url: './addresses/5'},
        // {label: 'Password', url: './password'},
        {label: 'Logout', url: './login'}
    ];

    constructor() { }
}
