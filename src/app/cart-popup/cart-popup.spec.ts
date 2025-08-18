import { TestBed } from '@angular/core/testing';
import { CartPopupComponent } from './cart-popup';
import { CartService } from '../cart.service';
import { of } from 'rxjs';
import { ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

describe('CartPopupComponent', () => {
  let component: CartPopupComponent;
  let fixture: ComponentFixture<CartPopupComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartPopupComponent ],
      providers: [
        { provide: CartService, useValue: {
          getCartData: () => of({
            productType: 'Test Product',
            productImage: 'test-image.jpg',
            availableSizes: ['Small', 'Medium', 'Large'],
            availableFlavours: ['Vanilla', 'Chocolate', 'Strawberry']
          })
        }}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPopupComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product type', () => {
    const productTypeElement = fixture.nativeElement.querySelector('h2');
    expect(productTypeElement.textContent).toBe('Test Product Cart');
  });

  it('should display product image', () => {
    const productImageElement = fixture.nativeElement.querySelector('img');
    expect(productImageElement.src).toBe('test-image.jpg');
  });

  it('should display available sizes', () => {
    const sizeElements = fixture.nativeElement.querySelectorAll('.options button');
    expect(sizeElements.length).toBe(3);
    expect(sizeElements[0].textContent).toBe('Small');
    expect(sizeElements[1].textContent).toBe('Medium');
    expect(sizeElements[2].textContent).toBe('Large');
  });

  it('should display available flavours', () => {
    const flavourElements = fixture.nativeElement.querySelectorAll('.options button');
    expect(flavourElements.length).toBe(3);
    expect(flavourElements[0].textContent).toBe('Vanilla');
    expect(flavourElements[1].textContent).toBe('Chocolate');
    expect(flavourElements[2].textContent).toBe('Strawberry');
  });

  it('should update quantity when buttons are clicked', () => {
    const quantityElement = fixture.nativeElement.querySelector('.qty span');
    expect(quantityElement.textContent).toBe('1');
    const increaseButton = fixture.nativeElement.querySelector('.qty button:last-child');
    increaseButton.click();
    fixture.detectChanges();
    expect(quantityElement.textContent).toBe('2');
    const decreaseButton = fixture.nativeElement.querySelector('.qty button:first-child');
    decreaseButton.click();
    fixture.detectChanges();
    expect(quantityElement.textContent).toBe('1');
  });

  it('should emit close event when close button is clicked', () => {
    const closeButton = fixture.nativeElement.querySelector('.close-btn');
    spyOn(component.close, 'emit');
    closeButton.click();
    expect(component.close.emit).toHaveBeenCalledTimes(1);
  });
});
