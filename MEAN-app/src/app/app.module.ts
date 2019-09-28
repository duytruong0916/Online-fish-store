import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms' ;
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MyOwnCustomMaterialModule} from './SharedModules.module';

import {ValidateService} from './Services/validate.service';
import {AppComponent} from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {NarbarComponent} from './Navbar/narbar.component';
import {HomeComponent} from './Home/home.component';
import { RegisterComponent } from './account/Register/register.component';
import { PagenotfoundComponent } from './Pagenotfound/pagenotfound/pagenotfound.component';
import {AuthService} from './Services/auth.service';
import { ProfileComponent } from './account/Profile/profile.component';
import {ProductService} from './Services/product.service';
import {RegistersecondphaseComponent } from './account/registersecondphase/registersecondphase.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FooterComponent} from './footer/footer.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HeaderInterceptor } from './Services/auth-intercept';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistersecondphaseComponent,
    NarbarComponent,
    RegisterComponent,
    PagenotfoundComponent,
    ProfileComponent,
    FooterComponent,
    MainNavComponent,
    ProductComponent
  ],
  imports: [
    MyOwnCustomMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [ProductService, ValidateService, AuthService,
               {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule { }
