import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './billing.html',
  styleUrls: ['./billing.css']
})
export class BillingComponent implements OnInit {
  order: any = null;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    setTimeout(() => {
    this.order = this.cartService.getCartData();
    console.log('Order in billing:', this.order);
  }, 50);
}
}