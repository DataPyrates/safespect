import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../api/user.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: any;
  isActiveToggleTextPassword: boolean;

  constructor(private route: Router, private api: UserService) { }

  ngOnInit() {
  }

  forgot() {
    if (this.email) {
      this.api.forgot(this.email).subscribe(
        data => {
          if ((data[0]['status'] == 1)) {
            alert("Mail sent successfully your id !!!");
            this.route.navigate(['/login']);
          }
          else {
            alert(data[0]['msg']);
          }
        })
    }
  }

  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }
  public getType() {
    return this.isActiveToggleTextPassword ?
      'password' : 'text';
  }
}
