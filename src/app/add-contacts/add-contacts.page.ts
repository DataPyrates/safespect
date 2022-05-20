import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../api/user.service';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.page.html',
  styleUrls: ['./add-contacts.page.scss'],
})
export class AddContactsPage implements OnInit {
  fname:any;
  lname:any;
  mobile:any;

  constructor(private route: Router, private api: UserService) { }

  ngOnInit() {
  }

  addcontact(){
      this.api.addcontact(this.fname,this.lname,this.mobile).subscribe(
      data => {
      console.log(data);
       if((data[0]['status']==1)){
         alert('Contact added Successfully !!!');
         this.route.navigate(['/contact-details']);
       }
       else{
        alert(data[0]['msg']);
       }
      })
      
    }

    Cancel(){
      this.route.navigate(['/home']);
    }
}
