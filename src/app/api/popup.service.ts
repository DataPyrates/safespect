import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor( public atrCtrl: AlertController) { }

  async showAlert(header,subHeader) {
    let alert = this.atrCtrl.create({
      header: header,
      subHeader: subHeader,
      buttons: ['OK']
    });
    (await alert).present();
  }
}
