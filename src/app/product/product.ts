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

  selectedFlavour: string = ''; 
  selectedSize: string = ''; 
  quantity: number = 1; 
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

    console.log(`Adding ${this.quantity} ${this.selectedSize} ${this.selectedFlavour} ${this.productType} to cart`);
  }
}

