import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { CartPopupComponent } from '../cart-popup/cart-popup';

@Component({
  selector: 'app-popsicle',
  standalone: true,
  imports: [CommonModule, FormsModule, CartPopupComponent],
  templateUrl: './popsicle.html',
  styleUrls: ['./popsicle.css']
})
export class Popsiclecomponent {
  flavourImages: { [key: string]: string } = {
    lime: '/assets/lime.png',
    lettuce: '/assets/lettuce.png',
    cherry1: '/assets/cherry1.png',
  };
  currentImage = this.flavourImages['lime'];
  selectedFlavour = 'lime';
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
      productType: 'Popsicle',
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
}
}




