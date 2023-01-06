import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  url = "http://localhost:4040/authenticate"

  constructor(private http: HttpClient, private router: Router) { }

  // calling the server(backend) to generate token
  public generateToken(userLoginData: any) {
    return this.http.post('http://localhost:4040/authenticate', userLoginData);
  }

  public getCurrentUser(username:any) {
    //console.log(username);
    return this.http.get('http://localhost:4040/current-user/'+username);
  }

  public loginUser(token: any) {
    //console.log(token);
    localStorage.setItem('token', token.jwtResponse);
    return true;
  }

  // to check that admin is logged or not
  public isUserLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token == '' || token == null) {
     // console.log("User not logged");
      return false;
    }
    else {
      //console.log("User logged successfulyy");
      //console.log(this.getToken());
      return true;
    }
  }

  // for logout the User
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    //console.log(localStorage.getItem('token'));
    localStorage.clear();
    //this.router.navigateByUrl('home');
    return true;
  }

  // for getting the token from local storage
  public getToken() {
    //console.log( localStorage.getItem('token'));
    return localStorage.getItem('token');
  }


  public setUser(user: any) {
    localStorage.setItem('user', JSON.parse(user));
  }


 public getUserType(){
  let user=this.getUser();
  return user.role;
 }
  //get user

  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {

    }

  }
}
