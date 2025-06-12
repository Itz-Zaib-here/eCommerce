import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductPopUpComponent } from './add-product-pop-up.component';

describe('AddProductPopUpComponent', () => {
  let component: AddProductPopUpComponent;
  let fixture: ComponentFixture<AddProductPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
