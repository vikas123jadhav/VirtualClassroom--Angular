import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

 
  user={
    username:'',
    name:'',
    mobileNo:'',
    email:'',
    status:'',
    role:'',
    age:'',
    subject:'',
    deptno:'',
  }

constructor( private login:LoginServiceService) { }

ngOnInit(): void {
 this.user=this.login.getUser();

}

}
