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
  basePrice: number = 10; 

  get totalPrice(): number {
    return this.quantity * this.basePrice;
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
        : ['lime', 'lettuce', 'cherry'];
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
    this.productImage = `/assets/${flavour}.png`; 
  }
  
  updateImage() {
    this.productImage = this.flavourImages[this.selectedFlavour] || '';
  }

  private updateCartData() {
  this.cartService.setCartData({
    productType: this.productType,
    flavour: this.selectedFlavour,
    size: this.selectedSize,
    quantity: this.quantity,
    image: this.productImage
  });
}

  increaseQty() {
  this.quantity++;
  this.updateCartData(); 
}

decreaseQty() {
  if (this.quantity > 1) {
    this.quantity--;
    this.updateCartData(); 
  }
}

checkout() {
  const cartData = {
    productType: this.productType,
    flavour: this.selectedFlavour,
    size: this.selectedSize,
    quantity: this.quantity,
    image: this.productImage
  };

  const message = [
    '=== ORDER SUMMARY ===',
    `Product: ${this.productType}`,
    `Flavor: ${this.selectedFlavour.charAt(0).toUpperCase() + this.selectedFlavour.slice(1)}`,
    `Size: ${this.selectedSize.charAt(0).toUpperCase() + this.selectedSize.slice(1)}`,
    `Quantity: ${this.quantity}`,
    `Total: $${this.totalPrice.toFixed(2)}`,
    '',
    'Proceeding to checkout...'
  ].join('\n');

  alert(message);

  console.log('📦 Setting cart data:', cartData);
  this.cartService.setCartData(cartData);
  this.router.navigate(['/billing']);
  this.close.emit();
}
  closePopup() {
  this.showPopup = false;
}

 @Input() inputData: any;

  ngAfterViewInit() {
    this.availableSizes = this.inputData.availableSizes;
    this.availableFlavours = this.inputData.availableFlavours;
    this.productType = this.inputData.productType;
    this.productImage = this.inputData.productImage;
  }

}


