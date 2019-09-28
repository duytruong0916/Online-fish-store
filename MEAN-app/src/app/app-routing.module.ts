import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RegistersecondphaseComponent} from "./account/registersecondphase/registersecondphase.component";
import { HomeComponent } from './Home/home.component';
import { RegisterComponent } from './account/Register/register.component';
import { PagenotfoundComponent } from './Pagenotfound/pagenotfound/pagenotfound.component';
import { ProfileComponent } from './account/Profile/profile.component';
import { AuthGaurd } from './Services/auth.guard';
import { ProductComponent } from './product/product.component';
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'product', component: ProductComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGaurd]},
  {path: 'account', component: RegistersecondphaseComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: [AuthGaurd]
})
export class AppRoutingModule { }
