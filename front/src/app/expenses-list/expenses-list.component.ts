import { ExpensesEventType } from './expenses-form/expenses-event.type';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { ExpensesService } from './expenses.service';
import { ExpensesFormEvent } from './expenses-form/expenses-form.event';

const { CREATE, UPDATE } = ExpensesEventType;

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {
  data: any;
  total = 0;
  formEvent = new EventEmitter<ExpensesFormEvent>();

  constructor(private expenseService: ExpensesService) { }

  ngOnInit() {
    this.expenseService.getAll()
      .subscribe((data) => {
        this.data = data;
        this.updateTotal();
      });
  }

  show(item?) {
    if (!item) {
      this.formEvent.emit({
        type: ExpensesEventType.CREATE
      });
      return;
    }

    this.formEvent.emit({
      type: ExpensesEventType.UPDATE,
      data: item
    });
  }

  updateTotal() {
    this.total = this.data.reduce((prev, curr) => prev + curr.amount, 0);
  }

  update(evt) {
    this.updateView(evt);
    this.updateTotal();
  }

  updateView(evt) {
    if (evt.type === UPDATE) {
      this.updateItem(evt.data);
      return;
    }
    this.data.unshift(evt.data);
  }

  updateItem(data) {
    const expense = this.data.find((item) => item.id === data.id);
    expense.description = data.description;
    expense.amount = +data.amount;
  }
}
