import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../api/user.service';

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
 
  constructor(private route: Router, private api: UserService) { }

  ngOnInit() {
  }

  register(){
    if(this.username !=undefined && this.phone !=undefined && this.email !=undefined 
      && this.password !=undefined){
      this.api.register(this.username,this.phone,this.email,this.password).subscribe(
      data => {
      console.log(data);
       if((data[0]['status']=='success')){
         alert('Regsiter Successfully !!!');
         this.route.navigate(['/login']);
       }
       else{
        alert(data[0]['msg']);
       }
      })
      
    }
    else{
      alert("Please Enter all the details");
    }
  }

  gotoLogin(){
    this.route.navigate(['/login']);
  }
  
}