import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {

  @Input() productType: string = '';
  @Input() flavourImages: { [flavour: string]: string }= {};
  @Input() flavours: string[] = [];
  @Input() sizes: string[] = [];

  selectedFlavour: string = ''; // Add type annotation here
  selectedSize: string = ''; // Add type annotation here
  quantity: number = 1; // Default quantity
  constructor() { }

  ngOnInit(): void {
    if (this.flavours && this.flavours.length > 0) {
      this.selectedFlavour = this.flavours[0];
      this.selectedSize = this.sizes[0];
    }
  }

  changeFlavour(flavour: string): void {
    this.selectedFlavour = flavour;
  }

  addToCart(): void {
    if (this.quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

    // Add to cart logic here
    console.log(`Adding ${this.quantity} ${this.selectedSize} ${this.selectedFlavour} ${this.productType} to cart`);
  }
}

