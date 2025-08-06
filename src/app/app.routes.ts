import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { Icecream } from './icecream/icecream';
import { Popsicle} from './popsicle/popsicle';
import { BillingComponent } from './billing/billing';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'icecream', component: Icecream },
  { path: 'popsicle', component: Popsicle },
  { path: 'billing', component: BillingComponent },
];

@NgModule({
  declarations: [ ],
  imports: [RouterModule.forRoot(routes), BillingComponent, HomeComponent, Icecream, Popsicle],
  exports: [RouterModule]
})
export class AppRoutingModule {}
