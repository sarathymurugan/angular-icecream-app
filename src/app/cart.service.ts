import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartData: any = null;

  setCartData(data: any) {
    console.log('Saving cart:', data);
    this.cartData = data;
    localStorage.setItem('cartData', JSON.stringify(data));
     console.log('localStorage after set:', localStorage.getItem('cartData')); // <-- Add this line
  }

  getCartData() {
    if (!this.cartData) {
      const stored = localStorage.getItem('cartData');
      if (stored) {
        this.cartData = stored ? JSON.parse(stored): null;
        console.log('Loaded cart from localStorage:', this.cartData);
      }
    }
    return this.cartData;
  }

  clearCartData() {
    this.cartData = null;
    localStorage.removeItem('cartData');
  }
}