import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  @Input() productType: string = 'Popsicle';
  @Input() flavourImages: { [flavour: string]: string } = {
    lime: '/assets/lime.png',
    lettuce: '/assets/lettuce.png',
    cherry: '/assets/cherry1.png',
  };
    @Input() flavours: string[] = ['lime', 'lettuce', 'cherry1'];
  @Input() sizes: string[] = ['small', 'large'];
  
  currentImage = this.flavourImages['lime'];
  selectedFlavour: string = 'lime';
  selectedImage: string = '';
  selectedSize : string = '';
  quantity : number = 1;
  showCartPopup = false;
  showSuccessMessage = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
      this.selectedFlavour = this.flavours[0];
      this.selectedImage = this.flavourImages[this.selectedFlavour];
      this.selectedSize= this.sizes[0];
  }

  changeFlavor(flavour: string) {
    this.selectedFlavour = flavour;
   this.currentImage = this.flavourImages[flavour] || '';
  }

  onSizeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedSize = select.value;
  }

  updateQuantity(quantity: number): void {
    this.quantity = Math.max(1, quantity);
     if (quantity < 1) {
    alert('Quantity cannot be less than 1');
  }
  }

  addToCart() {
     if (this.quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

    console.log(`Adding ${this.quantity} ${this.selectedSize} ${this.selectedFlavour} ${this.productType} to cart`);

    this.cartService.setCartData({
      productType: 'Popsicle',
      flavour: this.selectedFlavour,
      size: this.selectedSize,
      quantity: this.quantity,
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




