import { Cookie } from "../models/cookie";
import { Observable } from 'rxjs';
import { of } from "rxjs/observable/of";

export class Cart{
    private static cookies: Cookie [] = [];
    private static totalPrice: number;

    static addToCart(cookie: Cookie){
        this.cookies.push(cookie);
    }
    
    static getCookies(): Observable<Cookie[]> {
        return of(this.cookies);
    }

    static getTotal(): Observable<number>{
        let total: number;
        this.cookies.forEach(element => {
            if (element.addOns) {
                element.addOns.forEach(addon => {
                    total+= addon.price;
                })
            }
            total += element.price;
        });
        return of(total);
    }

    static removeItem(cookie: Cookie) {
        for (const item of this.cookies) {
            if (item == cookie) {
                const i = this.cookies.indexOf(item, 0);
                if (i > -1) {
                    this.cookies.splice(i, 1);
                    return;
                }
            }
        }
    }

    static clearCart(){
        this.cookies = [];
    }

    static setPrice(val) {
        this.totalPrice = val;
    }

    static getPrice() {
        return this.totalPrice;
    }
}