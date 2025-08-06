import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../cart.service';
import { CartPopupComponent } from '../cart-popup/cart-popup';

@Component({
  selector: 'app-icecream',
  imports: [CommonModule, FormsModule, RouterModule, CartPopupComponent],
  templateUrl: './icecream.html',
  styleUrls: ['./icecream.css']
})
export class Icecream {
  // Current image source
  currentImage = '/assets/prune.png';
  selectedFlavour = 'prune';
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
      productType: 'Ice Cream',
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


