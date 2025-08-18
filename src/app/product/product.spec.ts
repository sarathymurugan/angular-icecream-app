import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product';
import { CartService } from '../cart.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['setCartData']);
    
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ProductComponent],
      providers: [
        { provide: CartService, useValue: cartServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    
    component.productType = 'Popsicle';
    component.flavours = ['lime', 'cherry'];
    component.sizes = ['small', 'large'];
    component.flavourImages = {
      lime: '/assets/lime.png',
      cherry: '/assets/cherry.png'
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with first flavour and size', () => {
    expect(component.selectedFlavour).toBe('lime');
    expect(component.selectedSize).toBe('small');
    expect(component.currentImage).toBe('/assets/lime.png');
  });

  it('should update flavour and image', () => {
    component.changeFlavor('cherry');
    expect(component.selectedFlavour).toBe('cherry');
    expect(component.currentImage).toBe('/assets/cherry.png');
  });

  it('should validate quantity range', () => {
    component.updateQuantity(0);
    expect(component.quantity).toBe(1);
    expect(component.showErrorMessage).toBeTrue();
    
    component.updateQuantity(101);
    expect(component.quantity).toBe(100);
  });

  it('should add valid items to cart', () => {
    component.quantity = 2;
    component.addToCart();
    
    expect(cartService.setCartData).toHaveBeenCalledWith({
      productType: 'Popsicle',
      flavour: 'lime',
      size: 'small',
      quantity: 2,
      image: '/assets/lime.png',
      price: 20
    });
  });

  it('should show popup when added to cart', () => {
    component.addToCart();
    expect(component.showCartPopup).toBeTrue();
  });
});