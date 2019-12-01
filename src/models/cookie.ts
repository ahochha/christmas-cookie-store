import { AddOn } from './add-on';

export class Cookie {
    name: string;
    imageLocation: string;
    price: number;
    description: string;
    quantity: number;
    addOns?: AddOn [];
}