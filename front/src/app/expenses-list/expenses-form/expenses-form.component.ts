import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpensesService } from '../expenses.service';
import { ExpensesEventType } from './expenses-event.type';
import { ExpensesFormEvent } from './expenses-form.event';
import { AuthService } from '../../login/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

const { CREATE, UPDATE } = ExpensesEventType;

@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.scss']
})
export class ExpensesFormComponent implements OnInit {
  @Input() event: EventEmitter<ExpensesFormEvent>;
  @Output() onSave = new EventEmitter<ExpensesFormEvent>();
  id: string;
  form: FormGroup;
  type: ExpensesEventType;
  submitted = false;
  show = false;
  invalidError = false;
  serverError = false;

  constructor(
    private expensesService: ExpensesService,
    private builder: FormBuilder,
    private authService: AuthService
  ) {
    this.createForm();
  }

  createForm(id = null, description = '', amount = '') {
    this.id = id;
    this.form = this.builder.group({
      description: [description, Validators.required],
      amount: [amount, Validators.required]
    });
  }

  ngOnInit() {
    this.event.subscribe((evt: ExpensesFormEvent) => {
      this.show = true;
      this.type = evt.type;
      if (evt.type === UPDATE) {
        const { id, description, amount } = evt.data;
        this.createForm(id, description, amount);
        return;
      }
      this.createForm();
    });
  }

  handeServerError(err) {
    this.serverError = true;
    // If Unathorized, go to login
    if (err.status === 401) {
      this.authService.logout();
    }
  }

  update() {
    const id = this.id;
    const { description, amount } = this.form.value;
    this.expensesService.update(id, description, amount)
      .subscribe((val) => {
        this.sendOnSaveEvent({ id, description, amount });
        this.show = false;
      }, this.handeServerError.bind(this));
  }

  create() {
    const { description, amount } = this.form.value;
    this.expensesService.create(description, amount)
    .subscribe((res) => {
      this.sendOnSaveEvent(res);
      this.show = false;
    }, this.handeServerError.bind(this));
  }

  save() {
    this.submitted = true;
    this.serverError = false;
    if (!this.form.valid) {
      this.invalidError = true;
      return;
    }
    this.invalidError = false;
    if (this.type === UPDATE) {
      this.update();
      return;
    }
    this.create();
  }

  sendOnSaveEvent(data) {
    this.onSave.emit({
      type: this.type,
      data
    });
  }
}
