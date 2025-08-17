import { TestBed } from '@angular/core/testing';
import { Popsiclecomponent } from './popsicle';
import { CartService } from '../cart.service';
import { of } from 'rxjs';
import { ComponentFixture } from '@angular/core/testing';

describe('PopsicleComponent', () => {
  let component: Popsiclecomponent;
  let fixture: ComponentFixture<Popsiclecomponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Popsiclecomponent ],
      providers: [
        { provide: CartService, useValue: {
          setCartData: jasmine.createSpy('setCartData')
        }}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Popsiclecomponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    component.flavourImages = {
      'Orange': 'orange-image.jpg',
      'Grape': 'grape-image.jpg',
      'Lemon': 'lemon-image.jpg'
    };
    component.flavours = ['Orange', 'Grape', 'Lemon'];
    component.sizes = ['Small', 'Medium', 'Large'];
    fixture.detectChanges();
  });

   it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default flavour and size', () => {
    expect(component.selectedFlavour).toBe('Orange');
    expect(component.selectedSize).toBe('Small');
  });

  it('should change flavour', () => {
    component.changeFlavour('Grape');
    expect(component.selectedFlavour).toBe('Grape');
  });


  it('should add item to cart', () => {
    component.selectedFlavour = 'Orange';
    component.selectedSize = 'Small';
    component.quantity = 2;
    component.addToCart();
    expect(cartService.setCartData).toHaveBeenCalledTimes(1);
    expect(cartService.setCartData).toHaveBeenCalledWith({
      flavour: 'Orange',
      size: 'Small',
      quantity: 2
    });
  });

   it('should not add item to cart with invalid quantity', () => {
    component.selectedFlavour = 'Orange';
    component.selectedSize = 'Small';
    component.quantity = 0;
    component.addToCart();
    expect(cartService.setCartData).not.toHaveBeenCalled();
  });
});
