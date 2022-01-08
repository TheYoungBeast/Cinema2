import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.css']
})
export class PurchaseDetailsComponent implements OnInit {
  @Input() seats: Array<number> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
