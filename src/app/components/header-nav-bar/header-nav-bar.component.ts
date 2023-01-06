import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-header-nav-bar',
  templateUrl: './header-nav-bar.component.html',
  styleUrls: ['./header-nav-bar.component.css']
})
export class HeaderNavBarComponent implements OnInit {

  
  @Output() sideNavToggled= new EventEmitter<boolean>();
  menuStatus: boolean=false;

  public loggedIn=false;
    name:any;
  role:any;

  constructor( private userLoginService:LoginServiceService , private router:Router) { }

   

  
  ngOnInit(): void {
    this.loggedIn=this.userLoginService.isUserLoggedIn()
    if(!this.loggedIn){
     this.router.navigateByUrl('home');
   }
  //  this.role=localStorage.getItem('role')
  // this.name=localStorage.getItem('name'); 
  console.log()
  if(this.userLoginService.getUser()== undefined){}
  else{
     this.role=this.userLoginService.getUser().role;
     this.name=this.userLoginService.getUser().name;
  }
}

sideNavToggle(){
     this.menuStatus= !this.menuStatus;
     this.sideNavToggled.emit(this.menuStatus);
}

  logoutUser(){
    this.userLoginService.logout()
    location.reload()
    //this.router.navigateByUrl('home');
  }

  // toLoginPage(){
  //   this.router.navigateByUrl('login')
  // }

  // toStudentRegisterPage(){
  //   this.router.navigateByUrl('registerStudent')
  // }


}
