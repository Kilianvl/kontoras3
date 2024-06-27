import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberRangesComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: NumberRangesComponent;
  let fixture: ComponentFixture<NumberRangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberRangesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberRangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
