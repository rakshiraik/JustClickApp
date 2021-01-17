import { Component, OnInit } from '@angular/core';
import { Order } from  '../../../../../../app/shared/interfaces/order';
import { orders } from '../../../../../../data/account-orders';
@Component({
  selector: 'app-cetegory-list',
  templateUrl: './cetegory-list.component.html',
  styleUrls: ['./cetegory-list.component.scss']
})
export class CetegoryListComponent implements OnInit {

  constructor() { }
  orders: Partial<Order>[] = orders;
  ngOnInit(): void {
   
  }

}
