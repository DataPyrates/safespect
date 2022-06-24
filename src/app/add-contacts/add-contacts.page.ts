import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../api/user.service';
import { PopupService } from '../api/popup.service';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.page.html',
  styleUrls: ['./add-contacts.page.scss'],
})
export class AddContactsPage implements OnInit {
  fname: any;
  lname: any;
  mobile: any;

  constructor(private route: Router, private api: UserService, public popup: PopupService) { }

  ngOnInit() {
  }

  addcontact() {
    if (this.fname && this.lname && this.mobile) {
      this.api.addcontact(this.fname, this.lname, this.mobile).subscribe(
        data => {
          console.log(data);
          if ((data[0]['status'] == 1)) {
            this.popup.showAlert('Contact', 'Contact added Successfully !!!');
            this.fname = this.lname = this.mobile = '';
          }
          else {
            alert(data[0]['msg']);
            this.popup.showAlert('Contact', data[0]['msg']);
          }
        })
    }
    else {
      this.popup.showAlert('Contact', 'Please enter all the details');
    }

  }

  Cancel() {
    this.route.navigate(['/homepage']);
  }
}
