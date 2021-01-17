import { Component, Input } from '@angular/core';
import { Category } from '../../../shared/interfaces/category';
import { RootService } from '../../../shared/services/root.service';

@Component({
    selector: 'app-block-categories-header',
    templateUrl: './block-categories-header.component.html',
    styleUrls: ['./block-categories-header.component.scss']
})
export class BlockCategoriesHeaderComponent {
    @Input() header = '';
    @Input() layout: 'classic'|'compact' = 'classic';
    @Input() categories: Category[] = [];

    constructor(
        public root: RootService,
    ) { 

    }

    ngOnInit(): void {
        //alert(this.categories);
    }
}
