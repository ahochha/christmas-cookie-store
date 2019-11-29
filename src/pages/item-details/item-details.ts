import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Cart } from '../../data-store/cart';
import { ADDONS } from '../../data-store/add-ons';
import { ListPage } from '../list/list';
import { CartPage } from '../cart-page/cart-page';
import { Cookie } from '../../models/cookie';
import { DelayProvider } from '../../providers/delay/delay';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: Cookie;
  addons = ADDONS;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, public delayProvider: DelayProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = new Cookie();
    const item = navParams.get('item');
    this.selectedItem.name = item.name;
    this.selectedItem.price = item.price;
    this.selectedItem.description = item.description;
    this.selectedItem.imageLocation = item.imageLocation;
    this.selectedItem.addOns = item.addons;
  }

  ionViewDidLoad() {
  }

  async addToCart(){
    Cart.addToCart(this.selectedItem);
    this.presentLoading('Please wait...');

    this.selectedItem = undefined;

    await this.delayProvider.delay(200);
    this.navCtrl.setRoot(CartPage);
  }

  selectAddon(element){
    if (this.selectedItem.addOns == undefined){
      this.selectedItem.addOns = [];
    }
    if (element.checked == true) {
      this.selectedItem.addOns.push(element);
    } else {
      const index = this.selectedItem.addOns.indexOf(element, 0);
      if (index > -1) {
         this.selectedItem.addOns.pop();
      }
   }
  }

  async gotoCookies() {
    await this.delayProvider.delay(200);
    this.navCtrl.setRoot(ListPage);
  }

  presentLoading(text: string) {
    this.loadingCtrl.create({
      content: text,
      duration: 1000,
      dismissOnPageChange: true,
    }).present();
  }
}
