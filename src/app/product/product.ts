
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { CartPopupComponent } from '../cart-popup/cart-popup';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})
export class ProductComponent implements OnInit {
  @Input() productType: string = '';
  @Input() flavourImages: Record<string, string> = {};
  @Input() flavours: string[] = [];
  @Input() sizes: string[] = [];
  @Input() basePrice: number = 10;

  currentImage: string = '';
  selectedFlavour: string = '';
  selectedSize: string = '';
  quantity: number = 1;
  showCartPopup: boolean = false;
  errorMessage: string = '';
  showErrorMessage: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.selectedFlavour = this.flavours[0];
    this.selectedSize = this.sizes[0];
    this.currentImage = this.flavourImages[this.selectedFlavour];
  }

  getFlavorColor(flavour: string): string {
  const colorMap: Record<string, string> = {
    lime: '#3ac6c2',
    lettuce: '#00ff22',
    cherry: '#D20A2E'
  };
  return colorMap[flavour] || '#cccccc';
}

  changeFlavor(flavour: string): void {
    this.selectedFlavour = flavour;
    this.currentImage = this.flavourImages[flavour] || '';
  }

  updateQuantity(quantity: number): void {
    this.quantity = Math.min(100, Math.max(1, quantity));
    if (quantity < 1 || quantity > 100) {
      this.showError('Quantity must be between 1-100');
    }
  }

  addToCart(): void {
    if (this.quantity < 1 || this.quantity > 100) {
      this.showError('Invalid quantity');
      return;
    }

    this.cartService.setCartData({
      productType: this.productType,
      flavour: this.selectedFlavour,
      size: this.selectedSize,
      quantity: this.quantity,
      image: this.currentImage,
      price: this.basePrice * this.quantity
    });
    
    this.showCartPopup = true;
  }

  closeCartPopup(): void {
    this.showCartPopup = false;
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.showErrorMessage = true;
    setTimeout(() => this.showErrorMessage = false, 3000);
  }
}