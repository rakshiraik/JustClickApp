import { Component } from '@angular/core';
import { getMaxListeners } from 'process';
import { StoreService } from '../../../../shared/services/store.service';

@Component({
    selector: 'app-footer-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
    constructor(public store: StoreService) { 

       

    }
    
}
