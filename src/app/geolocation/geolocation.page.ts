import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { RouteService } from '../api/route.service';
import { NavController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';


declare var google;

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;

  isTracking = false;
  trackedRoute = [];
  previousTracks = [];

  positionSubscription: Subscription;

  // latitude: number;
  // longitude: number;
  // mapflag: boolean;
  destination: any;
  destination_data: any;
  destination_flag: boolean;
  destination_flag_initial: boolean;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private routeser: RouteService,
    public navCtrl: NavController,
    private platform: Platform,
    private storage: Storage,
    private localNotifications: LocalNotifications
  ) {
    platform.ready().then(() => {
      this.initMap();
    });
  }

  async ngOnInit() {
    //  this.loadMap();
    await this.storage.create();
  }
  registerNotification(seconds: number) {
    this.localNotifications.schedule({
      title: 'my ${ms} notification',
      text: 'http://maps.google.com/maps?q=24.197611,120.780512',
      trigger: {
        in: seconds,
        unit: ELocalNotificationTriggerUnit.SECOND
      },
    });

  }

  // start google map 
  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.loadHistoricRoutes();

      let mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.geolocation.getCurrentPosition().then(pos => {
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.map.setCenter(latLng);
        this.map.setZoom(16);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }

  loadHistoricRoutes() {
    this.storage.get('routes').then(data => {
      if (data) {
        this.previousTracks = data;
      }
    });
  }

  startTracking() {
    this.isTracking = true;
    this.trackedRoute = [];

    this.positionSubscription = this.geolocation.watchPosition()
      .pipe(
        filter((p) => p.coords !== undefined) //Filter Out Errors
      )
      .subscribe(data => {
        setTimeout(() => {
          this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
          this.redrawPath(this.trackedRoute);
        }, 0);
      });
    console.log(this.trackedRoute);
  }
  shareLocation() {
    var url = 'http://maps.google.com/maps?q=' + this.trackedRoute['lat'] + ',' + this.trackedRoute['lng'];
    //var url = 'http://maps.google.com/maps?q=24.197611,120.780512'
    console.log(url, "url");
  }

  redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }

    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }

  stopTracking() {
    let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
    this.previousTracks.push(newRoute);
    this.storage.set('routes', this.previousTracks);

    this.isTracking = false;
    this.positionSubscription.unsubscribe();
    // this.currentMapTrack.setMap(null);
  }

  showHistoryRoute(route) {
    this.redrawPath(route);
  }
  // end google map

  destinationsearch(event) {
    if (this.destination && this.destination.length > 2) {
      this.routeser.wrap_machine_data(event.target.value).subscribe(
        (data: any) => {
          console.log("destination data", data);
          if (data && data.length > 0) {
            this.destination_data = data;
            this.destination_flag = true;
            this.destination_flag_initial = true;
            for (let i = 0; i < this.destination_data.length; i++) {
              if (this.destination_data[i]['name'] == this.destination) {
                this.destination_flag = false;
                this.destination_flag_initial = false;
              }
            }
          }
          else {

          }
        })
    }
  }

  selectedCity(transaction_number) {
    this.destination = transaction_number;
    this.destination_flag = false;
    this.destination_flag_initial = false;
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 }
    });
  }
}
