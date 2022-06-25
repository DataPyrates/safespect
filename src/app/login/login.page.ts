import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../api/user.service';
import { PopupService } from '../api/popup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any;
  loginData: Object;
  constructor(private route: Router, private api: UserService, public popup: PopupService) { }

  ngOnInit() {
    var user_id = localStorage.getItem('user_id');
    if (user_id) {
      this.route.navigate(['/homepage']);
    }
  }

  login() {
    if (this.email && this.password) {
      this.api.login(this.email, this.password).subscribe(
        data => {
          console.log(data);
          if ((data[0]['status'] == 'success')) {
            this.route.navigate(['/homepage']);
          }
          else {
            this.popup.showAlert('Login', 'Invalid Password');
          }
        })
    }
    else {
      this.popup.showAlert('Login', 'Please Enter Username & Password');
    }
  }
}