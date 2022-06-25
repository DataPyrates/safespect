import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../api/user.service';
import { PopupService } from '../api/popup.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: any;
  phone: any;
  email: any;
  password: any;

  constructor(private route: Router, private api: UserService, public popup: PopupService) { }

  ngOnInit() {
  }

  register() {
    if (this.username != undefined && this.phone != undefined && this.email != undefined
      && this.password != undefined) {
      this.api.register(this.username, this.phone, this.email, this.password).subscribe(
        data => {
          console.log(data);
          if ((data[0]['status'] == 'success')) {
            this.popup.showAlert('Regsiter', 'Regsiter Successfully !!!');
            this.route.navigate(['/login']);
          }
          else {
            this.popup.showAlert('Regsiter', data[0]['msg']);
          }
        })

    }
    else {
      this.popup.showAlert('Regsiter', 'Please enter all the details');
    }
  }

  gotoLogin() {
    this.route.navigate(['/login']);
  }

}