import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { CartPage } from '../cart-page/cart-page';
import { COOKIES } from '../../data-store/cookies';
import { DelayProvider } from '../../providers/delay/delay';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  cookies = COOKIES;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public delayProvider: DelayProvider) {
  }

  async itemTapped(event, item) {
    await this.delayProvider.delay(200);
    this.navCtrl.setRoot(ItemDetailsPage, {
      item: item
    });
  }

  async gotoCart() {
    await this.delayProvider.delay(200);
    this.navCtrl.setRoot(CartPage);
}

  getCookies() {
    return this.cookies;
  }
}
