import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPopup } from './cart-popup';

describe('CartPopup', () => {
  let component: CartPopup;
  let fixture: ComponentFixture<CartPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
