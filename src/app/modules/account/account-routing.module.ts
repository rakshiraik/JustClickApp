import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageOrdersListComponent } from './pages/page-orders-list/page-orders-list.component';
import { PageAddressesListComponent } from './pages/page-addresses-list/page-addresses-list.component';
import { PageProfileComponent } from './pages/page-profile/page-profile.component';
import { PagePasswordComponent } from './pages/page-password/page-password.component';
import { PageOrderDetailsComponent } from './pages/page-order-details/page-order-details.component';
import { PageEditAddressComponent } from './pages/page-edit-address/page-edit-address.component';
import { CetegoryListComponent } from './pages/page-category-list/cetegory-list/cetegory-list.component';
import { ProductListComponent } from './pages/Product/product-list/product-list.component';
import { AuthGuard } from '../../Auth/auth-guard';
const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                component: PageDashboardComponent,canActivateChild: [AuthGuard],
            },
            {
                path: 'profile',
                component: PageProfileComponent
            },
            {
                path: 'addresses',
                component: PageAddressesListComponent
            },
            {
                path: 'addresses/:addressId',
                component: PageEditAddressComponent
            },
            {
                path: 'orders',
                component: PageOrdersListComponent
            },
            {
                path: 'orders/:orderId',
                component: PageOrderDetailsComponent
            },
            {
                path: 'password',
                component: PagePasswordComponent
            },
            {
                path: 'CategoryList',
                component: CetegoryListComponent,canActivateChild: [AuthGuard],
            },
            {
                path: 'ProductList',
                component: ProductListComponent,canActivateChild: [AuthGuard],
            },
        ]
    },
    {
        path: 'login',
        component: PageLoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
