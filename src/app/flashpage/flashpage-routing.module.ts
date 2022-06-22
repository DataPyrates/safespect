import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlashpagePage } from './flashpage.page';

const routes: Routes = [
  {
    path: '',
    component: FlashpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlashpagePageRoutingModule {}
