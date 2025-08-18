import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-billing',
  imports: [CommonModule, FormsModule],
  templateUrl: './billing.html',
  styleUrls: ['./billing.css']
})
export class BillingComponent implements OnInit {
  order: any = null;

  fullName: string = '';
  email: string = '';
  address: string = '';
  apt: string = '';
  useDifferentShipping: boolean = false;
  cantFindAddress: boolean = false;

  showErrorMessage: boolean = false;
  errorMessage: string = '';

  showSuccessMessage: boolean = false;
  successMessage: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.order = this.cartService.getCartData();
  }

  confirmOrder() {
    if (!this.fullName || !this.email || !this.address) {
  this.showErrorMessage = true;
  this.errorMessage = 'Please fill in all required fields.';
  
  setTimeout(() => {
    this.showErrorMessage = false;
    this.errorMessage = '';
  }, 2000); 
  
  return; 
}
    if (!this.order || !this.order.productType) {
      this.showErrorMessage = true;
      this.errorMessage = 'No order found. Please try again.';
      return;
    }

   const total = Number(this.order.quantity) * 10;
if (isNaN(total)) {
  console.error('Invalid quantity value:', this.order.quantity);
  return;
}

const summary = `
  ${this.fullName} ordered:
  Product: ${this.order.productType || 'N/A'}
  Flavor: ${this.order.flavour || 'N/A'}
  Size: ${this.order.size || 'N/A'}
  Quantity: ${this.order.quantity}
  Total: $${total.toFixed(2)}
`;
    this.saveOrderToBackend(summary);
  }

  saveOrderToBackend(summary: string) {
    this.showSuccessMessage = true;
    this.successMessage = 'Order Confirmed!';
setTimeout(() => {
  this.router.navigate(['/']); 
}, 9000); 
  }
}
