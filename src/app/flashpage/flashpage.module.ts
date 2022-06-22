import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlashpagePageRoutingModule } from './flashpage-routing.module';

import { FlashpagePage } from './flashpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlashpagePageRoutingModule
  ],
  declarations: [FlashpagePage]
})
export class FlashpagePageModule {}
