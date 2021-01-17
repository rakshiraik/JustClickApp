import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    address = 'Pavoor Complex,Kunjathur,Manjeshwara';
    email = 'dkinfomlr@gmail.com';
    phone = ['9141410060'];
    hours = 'Mon-Sat 7:00am - 7:00pm';

    get primaryPhone(): string|null {
        return this.phone.length > 0 ? this.phone[0] : null;
    }

    constructor() { }
}
