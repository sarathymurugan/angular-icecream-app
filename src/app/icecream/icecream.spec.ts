import { TestBed } from '@angular/core/testing';
import { IcecreamComponent } from './icecream';
import { CartService } from '../cart.service';
import { ComponentFixture } from '@angular/core/testing';


providers: [
  { provide: CartService, 
    useValue: {
      addCartItem: jasmine.createSpy('addCartItem')
    }
  }
]

describe('IcecreamComponent', () => {
  let component: IcecreamComponent;
  let fixture: ComponentFixture<IcecreamComponent>;
  let cartService: CartService;


  const mockCartService = {
  setCartData: jasmine.createSpy('setCartData')
};

// In test:
expect(mockCartService.setCartData).toHaveBeenCalledWith({
  productType: 'Ice Cream',
  flavour: 'prune',
  size: 'small',
  quantity: 1,
  image: '/assets/prune.png'
});

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

  it('should show error for invalid quantity', () => {
  component.quantity = 0;
  component.addToCart();
  expect(component.showErrorMessage).toBeTrue();
});

it('should update image when flavour changes', () => {
  component.changeFlavor('cherry');
  expect(component.currentImage).toBe('/assets/cherry.png');
});

  it('should change flavour', () => {
    component.changeFlavor('Grape');
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
