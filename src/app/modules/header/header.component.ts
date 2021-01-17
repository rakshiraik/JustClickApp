import { Component, Input } from '@angular/core';
import { StoreService } from '../../shared/services/store.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() layout: 'classic'|'compact' = 'classic';

    constructor(public store: StoreService, public loginService:UserService) { }
}
