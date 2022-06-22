import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactNativePage } from './contact-native.page';

const routes: Routes = [
  {
    path: '',
    component: ContactNativePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactNativePageRoutingModule {}
