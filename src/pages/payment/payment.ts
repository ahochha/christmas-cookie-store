import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cart } from '../../data-store/cart';
import { DelayProvider } from '../../providers/delay/delay';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  isCard = true;
  formGroup: FormGroup;
  total: number;
  constructor(public alertController: AlertController,public navCtrl: NavController, public navParams: NavParams,private _formBuilder: FormBuilder, public delayProvider: DelayProvider) {

    this.formGroup = this._formBuilder.group({
      email: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardExpDate: ['', Validators.required],
      cardCvv: ['', Validators.required],
      cardName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    });
    this.total = Cart.getPrice();
  }

  ionViewDidLoad() {
  }

  toggleCard() {
    this.isCard = !this.isCard;
  }

  checkout(){
    const alert = this.alertController.create({
      message: 'Success! You will now be taken back to the home page',
      buttons: [{text:'OK', handler: () =>{
          Cart.clearCart();
          this.navCtrl.setRoot(ListPage);
      }}]
    });

    alert.present();
  }

  async gotoHome() {
    await this.delayProvider.delay(200);
    this.navCtrl.setRoot(ListPage);
  }
}
