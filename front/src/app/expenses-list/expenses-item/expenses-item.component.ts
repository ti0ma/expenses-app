import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expenses-item',
  templateUrl: './expenses-item.component.html',
  styleUrls: ['./expenses-item.component.scss']
})
export class ExpensesItemComponent implements OnInit {
  @Input() item;

  constructor() { }

  ngOnInit() {
  }

}
