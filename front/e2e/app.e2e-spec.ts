import { ExpensesappPage } from './app.po';

describe('expensesapp App', () => {
  let page: ExpensesappPage;

  beforeEach(() => {
    page = new ExpensesappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
