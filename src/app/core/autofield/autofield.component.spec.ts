import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutofieldComponent } from './autofield.component';

describe('AutofieldComponent', () => {
  let component: AutofieldComponent;
  let fixture: ComponentFixture<AutofieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutofieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutofieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
