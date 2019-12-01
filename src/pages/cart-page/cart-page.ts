import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cart } from '../../data-store/cart';
import { Cookie } from '../../models/cookie';
import { ListPage } from '../list/list';
import { PaymentPage } from '../payment/payment';
import { DelayProvider } from '../../providers/delay/delay';
import { ItemDetailsPage } from '../item-details/item-details';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart-page.html',
})
export class CartPage {

  cart: Cart;
  totalPrice: number;
  pricePlusTax: number;
  tipPrice: number = 0;
  tipForm: any;
  cookies: Cookie[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public delayProvider: DelayProvider) {
    
  }

  ionViewDidLoad() {
    Cart.getCookies().subscribe(items => {
      this.cookies = items;
    });
  }
  
  getItems(){
    Cart.getCookies().subscribe(items => {
      this.cookies = items;
    });
  }

  async checkout() {
    await this.delayProvider.delay(200);
    Cart.setPrice(this.getTotal());
    this.navCtrl.setRoot(PaymentPage);
  }

  async gotoCookies() {
    await this.delayProvider.delay(200);
    this.navCtrl.setRoot(ListPage);
  }

  async gotoItemDetails(item) {
    let itemIndex: number = this.cookies.indexOf(item);
    if(itemIndex == -1) {
      itemIndex = null;
    }
    if(item.addOns){
      for(let addon of item.addOns){
        addon.checked = true;
      }
    }
    await this.delayProvider.delay(200);
    this.navCtrl.setRoot(ItemDetailsPage, {
      item: item,
      index: itemIndex
    });
  }

  async clearCart() {
    await this.delayProvider.delay(200);
    Cart.clearCart();
    this.navCtrl.setRoot(CartPage);
  }

  removeItem(item) {
    Cart.removeItem(item);
    this.getItems();
  }

  getPrice(item) {
    let price = item.price * item.quantity;

    if (item.addOns) {
      for (const addon of item.addOns) {
        price += addon.price;
      }
    }
    const total = Number(price).toFixed(2);
    
    return total;
  }

  getSum() {
    this.totalPrice = 0;
    for (const item of this.cookies) {
      this.totalPrice += item.price * item.quantity;
      if (item.addOns) {
        for (const addon of item.addOns) {
          this.totalPrice += addon.price;
        }
      }
    }
    const total = Number(this.totalPrice).toFixed(2);

    return total;
  }

  getTax() {
    const price = this.totalPrice * .065;
    const tax = Number(price).toFixed(2);
    return tax;
  }

  getTotal() {
    this.pricePlusTax = this.totalPrice * 1.065;
    this.pricePlusTax += this.tipPrice;
    const total = Number(this.pricePlusTax).toFixed(2);
    return total;
  }

  isCartEmpty() {
    return (this.totalPrice == 0);
  }

  updateTip(percentage: number) {
    this.tipPrice = percentage * this.totalPrice;
  }

  getTip() {
    return Number(this.tipPrice).toFixed(2);
  }

  changeTip() {
    const temp = Number(this.tipForm);
    this.tipPrice = temp;
  }
}
