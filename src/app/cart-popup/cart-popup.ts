import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-popup.html',
  styleUrls: ['./cart-popup.css']
})
export class CartPopupComponent implements OnInit {
  @Input() productType: string = '';
  @Input() availableSizes: string[] = [];
  @Input() availableFlavours: string[] = [];
  @Input() flavourImages: { [flavour: string]: string } = {};
  @Input() selectedFlavourImage: string = '';
  @Input() selectedSizeImage: string = '';

  @Output() close = new EventEmitter<void>();

  showPopup: boolean = true;

  selectedSize: string = '';
  selectedFlavour: string = '';
  quantity: number = 1;
  productImage: string = '';
  basePrice: number = 0; // Add basePrice property with a default value

  get totalPrice(): number {
    return this.quantity * 10;
  }

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    const data = this.cartService.getCartData();
    if (data) {
      this.productType = data.productType;
      this.selectedFlavour = data.flavour;
      this.selectedSize = data.size;
      this.quantity = data.quantity;
      this.productImage = data.image;
      this.availableSizes = this.productType === 'Ice Cream'
        ? ['small', 'medium', 'large']
        : ['small', 'large'];
      this.availableFlavours = this.productType === 'Ice Cream'
        ? ['prune', 'squash', 'cherry']
        : ['lime', 'lettuce', 'cherry1'];
    }

    if (!this.selectedSize && this.availableSizes.length > 0) {
      this.selectedSize = this.availableSizes[0];
    }
    if (!this.selectedFlavour && this.availableFlavours.length > 0) {
      this.selectedFlavour = this.availableFlavours[0];
      this.updateImage();
    }
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  selectFlavour(flavour: string) {
    this.selectedFlavour = flavour;
    this.productImage = `/assets/${flavour}.png`; // Ensure image updates when flavour changes
  }
  
  updateImage() {
    this.productImage = this.flavourImages[this.selectedFlavour] || '';
  }

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }
  

  checkout() {
    const cartData = {
    productType: this.productType,
    flavour: this.selectedFlavour,
    size: this.selectedSize,
    quantity: this.quantity,
    image: this.productImage
  };

  alert(`Proceeding to checkout with:
  \nProduct: ${this.productType}
  \nSize: ${this.selectedSize}
  \nFlavour: ${this.selectedFlavour}
  \nQuantity: ${this.quantity}
  \nTotal Price: ${this.totalPrice}`);

  console.log('📦 Setting cart data:', cartData);
  this.cartService.setCartData(cartData);
  this.router.navigate(['/billing']);
  this.close.emit();
}

  closePopup() {
  // Hide the popup — you can use a variable to control visibility
  this.showPopup = false;
}

}
