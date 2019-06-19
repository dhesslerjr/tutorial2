import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { TopicsListComponent } from './topics-list/topics-list.component';
import { TopicDetailsComponent } from './topic-details/topic-details.component';
import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot([
      { path: '', component: TopicsListComponent },
      { path: 'products/:productId', component: ProductDetailsComponent},
      { path: 'cart', component: CartComponent},
      { path: 'login', component: LoginComponent},
      { path: 'shipping', component: ShippingComponent },
      { path: 'topics', component: TopicsListComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'topics/:topicID', component: TopicDetailsComponent },
  ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,
    TopicsListComponent,
    TopicDetailsComponent,
    LoginComponent
  ],
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy},LoginService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
