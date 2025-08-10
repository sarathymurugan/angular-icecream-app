import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { IcecreamComponent } from './icecream/icecream';
import { Popsiclecomponent} from './popsicle/popsicle';
import { BillingComponent } from './billing/billing';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'icecream', component: IcecreamComponent },
  { path: 'popsicle', component: Popsiclecomponent },
  { path: 'billing', component: BillingComponent },
];

@NgModule({
  declarations: [ ],
  imports: [RouterModule.forRoot(routes), BillingComponent, HomeComponent, IcecreamComponent, Popsiclecomponent],
  exports: [RouterModule]
})
export class AppRoutingModule {}


