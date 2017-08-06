import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpesesItemComponent } from './expeses-item.component';

describe('ExpesesItemComponent', () => {
  let component: ExpesesItemComponent;
  let fixture: ComponentFixture<ExpesesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpesesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpesesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
