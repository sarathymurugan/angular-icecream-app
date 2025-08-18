import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { CartPopupComponent } from '../cart-popup/cart-popup';
import { AppRoutingModule } from '../app.routes';

@Component({
  selector: 'app-icecream',
  standalone: true,
  imports: [CommonModule, FormsModule, CartPopupComponent],
  templateUrl: './icecream.html',
  styleUrls: ['./icecream.css']
})
export class IcecreamComponent {
  @Input() productType: string = 'Ice Cream';
  @Input() flavourImages: { [flavour: string]: string }= {
    prune: '/assets/prune.png',
    squash: '/assets/squash.png',
    cherry: '/assets/cherry.png',
  };
  @Input() flavours: string[] = ['prune', 'squash', 'cherry'];
  @Input() sizes: string[] = ['small', 'medium', 'large'];
   
  currentImage = this.flavourImages['prune'];
  selectedFlavour : string = 'prune';
  selectedImage: string='';
  selectedSize : string = '';
  quantity:number=1;
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
    this.quantity =  Math.max(1, quantity);
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
    productType: 'Ice Cream',
    flavour: this.selectedFlavour,
    size: this.selectedSize,
    quantity: this.quantity,  // Changed from selectedQuantity to quantity
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




