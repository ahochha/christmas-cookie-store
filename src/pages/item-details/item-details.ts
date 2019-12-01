import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Cart } from '../../data-store/cart';
import { ADDONS } from '../../data-store/add-ons';
import { ListPage } from '../list/list';
import { CartPage } from '../cart-page/cart-page';
import { Cookie } from '../../models/cookie';
import { DelayProvider } from '../../providers/delay/delay';
import { AddOn } from '../../models/add-on';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  cookieIndex: number = null;
  selectedItem: Cookie;
  addons = ADDONS;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, public delayProvider: DelayProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = new Cookie();
    const item: Cookie = JSON.parse(JSON.stringify(this.navParams.get('item')));
    this.selectedItem.name = item.name;
    this.selectedItem.price = item.price;
    this.selectedItem.description = item.description;
    this.selectedItem.quantity = item.quantity;
    this.selectedItem.imageLocation = item.imageLocation;
    this.selectedItem.addOns = item.addOns;

    if(this.navParams.get('index') != null){
      this.cookieIndex = navParams.get('index');
    } else {
      this.cookieIndex = null;
    }
  }

  ionViewDidLoad() {
    if(this.cookieIndex == null){
      this.addons.forEach(addon => this.resetCheckboxes(addon));
    
      if(this.selectedItem) {
        this.selectedItem.quantity = 1;
      }
    } else {
      this.addons.forEach(addon => this.updateCheckboxes(addon));
    }
  }

  resetCheckboxes(addon: AddOn){
    if(addon.checked == true){
      addon.checked = false;
    }
  }

  updateCheckboxes(addon: AddOn) {
    console.log(this.selectedItem.addOns, addon);
    if(this.selectedItem.addOns){
      
      let index = this.selectedItem.addOns.indexOf(addon);
      console.log(typeof(addon), typeof(this.selectedItem.addOns),index);
      if (this.selectedItem.addOns[index] != undefined && this.selectedItem.addOns[index].checked == true) {
        console.log('testing');
        addon.checked = true;
      } else {
        addon.checked = false;
      }
    }
    else{
      this.selectedItem.addOns =[];
    }
  }

  async modifyCart(operation: string) {
    if(operation == 'add'){
      Cart.addToCart(this.selectedItem);
    } else if(operation == 'update') {
      Cart.updateCookieInCart(this.selectedItem, this.cookieIndex);
    }

    this.presentLoading('Please wait...');
    this.selectedItem = undefined;
    this.cookieIndex = null;
    await this.delayProvider.delay(200);
    this.navCtrl.setRoot(CartPage);
  }

  selectAddon(element) {
    if (this.selectedItem.addOns == undefined){
      this.selectedItem.addOns = [];
    }
    if (element.checked == true) {
      this.selectedItem.addOns.push(element);
    } else {
      const index = this.selectedItem.addOns.indexOf(element);
      if (index > -1) {
         this.selectedItem.addOns.splice(index, 1);
      }
   }
  } 

  cookieQuantity(operation: string) {
    if(this.selectedItem){
      if (operation == 'add'){
        this.selectedItem.quantity += 1;
      } else if (operation == 'remove' && this.selectedItem.quantity > 1) {
        this.selectedItem.quantity -= 1;
      } 
    }
  }

  isQuantityOne() {
    return (this.selectedItem && this.selectedItem.quantity == 1);
  }

  isUpdatingCookie() {
    return (this.cookieIndex != null);
  }

  async gotoCookies() {
    this.selectedItem = undefined;
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
