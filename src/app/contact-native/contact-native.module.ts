import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactNativePageRoutingModule } from './contact-native-routing.module';

import { ContactNativePage } from './contact-native.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactNativePageRoutingModule
  ],
  declarations: [ContactNativePage]
})
export class ContactNativePageModule {}
