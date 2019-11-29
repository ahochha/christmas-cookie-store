import { Injectable } from '@angular/core';

/*
  Generated class for the DelayProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DelayProvider {

  delay(ms: number) {
    return new Promise (r => setTimeout(r, ms));
  }
  
}
