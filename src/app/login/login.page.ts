import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../api/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any;
  loginData: Object;
  constructor(private route: Router, private api: UserService) { }

  ngOnInit() {
    var user_id =localStorage.getItem('user_id');
  if(user_id){
    this.route.navigate(['/home']); 
  }
  }

  login() {
    if(this.email !=undefined && this.password !=undefined){
      this.api.login(this.email,this.password).subscribe(
      data => {
        console.log(data);
       if((data[0]['status']== 'success')){
            this.route.navigate(['/home']);
          }
          else{
            alert("Invalid Password");
          }
      })
    }
    else{
      alert("Please Enter Username and Password");
    }
  }
}
