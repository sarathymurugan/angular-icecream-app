import { TestBed } from '@angular/core/testing';
import { IcecreamComponent } from './icecream';
import { CartService } from '../cart.service';
import { of } from 'rxjs';
import { ComponentFixture } from '@angular/core/testing';

describe('IcecreamComponent', () => {
  let component: IcecreamComponent;
  let fixture: ComponentFixture<IcecreamComponent>;
  let cartService: CartService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcecreamComponent ],
      providers: [
        { provide: CartService, useValue: {
          addCartItem: jasmine.createSpy('addCartItem')
        }}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcecreamComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    component.productType = 'Ice Cream';
    component.flavourImages = {
      'Vanilla': 'vanilla-image.jpg',
      'Chocolate': 'chocolate-image.jpg',
      'Strawberry': 'strawberry-image.jpg'
    };
    component.flavours = ['Vanilla', 'Chocolate', 'Strawberry'];
    component.sizes = ['Small', 'Medium', 'Large'];
    fixture.detectChanges();
  });

   it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default flavour and size', () => {
    expect(component.selectedFlavour).toBe('Vanilla');
    expect(component.selectedSize).toBe('Small');
  });

  it('should change flavour', () => {
    component.changeFlavour('Grape');
    expect(component.selectedFlavour).toBe('Grape');
  });

  it('should add item to cart', () => {
    component.quantity = 2;
    component.selectedFlavour = 'Vanilla';
    component.selectedSize = 'Small';
    component.addToCart();
    expect(cartService.setCartData).toHaveBeenCalledTimes(1);
    expect(cartService.setCartData).toHaveBeenCalledWith({
      productType: 'Ice Cream',
      flavour: 'Vanilla',
      size: 'Small',
      quantity: 2
    });
  });
});