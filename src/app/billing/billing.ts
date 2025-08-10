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

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.order = this.cartService.getCartData();
  }

  confirmOrder() {
    if (!this.fullName || !this.email || !this.address) {
      alert('Please fill in all required fields.');
      return;
    }
    const summary = `
${this.fullName} ordered this:
Product: ${this.order?.productType}
Flavour: ${this.order?.flavour}
Size: ${this.order?.size}
Quantity: ${this.order?.quantity}
Total: $${this.order?.quantity * 10}
Order confirmed.
    `;
    alert(summary);
    this.router.navigate(['/']);
  }
}

