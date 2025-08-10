import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { CartPopupComponent } from '../cart-popup/cart-popup';

@Component({
  selector: 'app-icecream',
  standalone: true,
  imports: [CommonModule, FormsModule, CartPopupComponent],
  templateUrl: './icecream.html',
  styleUrls: ['./icecream.css']
})
export class IcecreamComponent {
  // Mapping for flavor to image
  flavourImages: { [key: string]: string } = {
    prune: '/assets/prune.png',
    squash: '/assets/squash.png',
    cherry: '/assets/cherry.png',
  };
  currentImage = this.flavourImages['prune'];
  selectedFlavour = 'prune';
  selectedSize = 'small';
  selectedQuantity = 1;
  showCartPopup = false;
  showSuccessMessage = false;

  constructor(private cartService: CartService) {}

  changeFlavor(flavour: string) {
    this.selectedFlavour = flavour;
    this.currentImage = this.flavourImages[flavour] || '';
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
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 2000);
  }

  closeCartPopup() {
    this.showCartPopup = false;
    // Do not clear cart data on popup close
  }
}




