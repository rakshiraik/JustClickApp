import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-block-products-header',
    templateUrl: './block-products-header.component.html',
    styleUrls: ['./block-products-header.component.scss']
})
export class BlockProductsHeaderComponent {
    @Input() header: string;
    @Input() layout: 'large-first'|'large-last' = 'large-last';
    @Input() products: any[] = [];

    ngOnInit(){
        //alert(this.products);
    }
    get large(): any {
        if (this.layout === 'large-first' && this.products.length > 0) {
            return this.products[0];
        } else if (this.layout === 'large-last' && this.products.length > 6) {
            return this.products[6];
        }

        return null;
    }

    // get smalls(): any[] {
    //     if (this.layout === 'large-first') {
    //         return this.products.slice(1, 7);
    //     } else  {
    //         return this.products.slice(0, 6);
    //     }
    // }

    get smalls(): any[] {
        if (this.layout === 'large-first') {
            return this.products.slice(1, 7);
        } else  {
            return this.products.slice(0, 6);
        }
    }

    constructor() { }
}
