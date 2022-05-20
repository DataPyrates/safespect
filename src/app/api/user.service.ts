import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 

  }
  public login(email,password){
    return this.http.get(environment.apiURL+'login.php?username='+email+'&password='+password);
  }
  public register(username,phone,email,password){
    return this.http.get(environment.apiURL+'register.php?username='+username+'&phone='+phone+'&email='+email+'&password='+password);
  }
  public addcontact(fname,lname,mobile){
    return this.http.get(environment.apiURL+'addcontact.php?fname='+fname+'&lname='+lname+'&mobile='+mobile);
  }
  public getcontact(){
    return this.http.get(environment.apiURL+'getcontact.php');
  }
}
