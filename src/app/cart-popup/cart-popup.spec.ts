import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartPopupComponent } from './cart-popup';

describe('CartPopup', () => {
  let component: CartPopupComponent;
  let fixture: ComponentFixture<CartPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

