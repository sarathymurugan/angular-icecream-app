import { TestBed } from '@angular/core/testing';
import { BillingComponent } from './billing';
import { CartService } from '../cart.service';
import { ComponentFixture } from '@angular/core/testing';

describe('BillingComponent', () => {
  let component: BillingComponent;
  let fixture: ComponentFixture<BillingComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingComponent ],
      providers: [
        { provide: CartService, useValue: {
          getCartData: () =>({
            productType: 'Test Product',
            flavour: 'Test Flavour',
            size: 'Test Size',
            quantity: 1,
            image: 'Test Image'
          })
        }}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

});
