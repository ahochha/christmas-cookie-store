import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { CartPage } from '../pages/cart-page/cart-page';
import { CheckoutPage } from '../pages/checkout/checkout';
import { PaymentPage } from '../pages/payment/payment';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DelayProvider } from '../providers/delay/delay';

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    CartPage,
    CheckoutPage,
    PaymentPage,
  ],
  imports: [
    BrowserModule,

    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    CartPage,
    CheckoutPage,
    PaymentPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DelayProvider
  ]
})
export class AppModule {}
