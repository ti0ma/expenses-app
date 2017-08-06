import { ExpensesEventType } from './expenses-event.type';

export interface ExpensesFormEvent {
  type: ExpensesEventType;
  data?: any;
};
