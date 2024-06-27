import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberRangeEditComponent } from './number-range-edit.component';

describe('NumberRangeEditComponent', () => {
  let component: NumberRangeEditComponent;
  let fixture: ComponentFixture<NumberRangeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberRangeEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberRangeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
