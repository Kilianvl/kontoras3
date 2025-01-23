import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceItemEditComponent } from './invoice-item-edit.component';

describe('AddressComponent', () => {
  let component: InvoiceItemEditComponent;
  let fixture: ComponentFixture<InvoiceItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceItemEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
