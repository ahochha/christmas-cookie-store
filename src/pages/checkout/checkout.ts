import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartPage } from '../cart-page/cart-page';
import { PaymentPage } from '../payment/payment';
import { DelayProvider } from '../../providers/delay/delay';

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public delayProvider: DelayProvider) {
  }

  ionViewDidLoad() {
  }

  async gotoCart() {
    await this.delayProvider.delay(200);
    this.navCtrl.setRoot(CartPage);
  }

  async gotoPay() {
    await this.delayProvider.delay(200);
    this.navCtrl.setRoot(PaymentPage);
  }
}
