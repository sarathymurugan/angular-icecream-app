import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToIceCream() {
    this.router.navigate(['/icecream']);
  }

  goToPopsicle() {
    this.router.navigate(['/popsicle']);
  }
}
