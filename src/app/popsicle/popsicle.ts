import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { CartPopupComponent } from '../cart-popup/cart-popup';

@Component({
  selector: 'app-popsicle',
  imports: [CommonModule, FormsModule, CartPopupComponent],
  templateUrl: './popsicle.html',
  styleUrls: ['./popsicle.css']
})
export class Popsicle {
  currentImage = '/assets/lime.png';
  selectedFlavour = 'lime';
  selectedSize = 'small';
  selectedQuantity = 1;
  showCartPopup = false;

  constructor(private cartService: CartService) {}

  changeFlavor(flavour: string) {
    this.selectedFlavour = flavour;
    this.currentImage = `/assets/${flavour}.png`;
  }

  onSizeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedSize = select.value;
  }

  addToCart() {
    this.cartService.setCartData({
      productType: 'Popsicle',
      flavour: this.selectedFlavour,
      size: this.selectedSize,
      quantity: this.selectedQuantity,
      image: this.currentImage
    });
    this.showCartPopup = true;
  }

  closeCartPopup() {
    this.showCartPopup = false;
    this.cartService.clearCartData();
  }
}
