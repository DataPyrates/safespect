import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../api/user.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
})
export class ContactDetailsPage implements OnInit {

  contacts:any;
  constructor(private route: Router, private api: UserService) { }

  ngOnInit() {
    this.getcontact();
  }
  getcontact(){
    this.api.getcontact().subscribe(
      data => {
      console.log(data);
      this.contacts = data;
  })
}
}
