import { Component} from '@angular/core';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(platform: Platform) {
    const config = {
      apiKey: 'AIzaSyChrhjUotCM1mGqsozwQVSZ72Xk7aCyxJk',
      authDomain: environment.apiURL,
      databaseURL: 'https://geo-tracker-830fa-default-rtdb.firebaseio.com/',
      projectId: 'geo-tracker-830fa',
      storageBucket: 'YOUR_STORAGE_BUCKET',
    };
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    });
    firebase.initializeApp(config);
  }
}

