import { Component,Input, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/Admin-Service/admin-service.service';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {

  @Input()  sideNavStatus: boolean = false;
  public loggedIn=false;
  role:any;

  studentAskedQue="askedQuestion";
  subjectList:any;

  constructor( private userLoginService: LoginServiceService, private adminService:AdminServiceService) { }

  ngOnInit(): void {
    
    this.loggedIn=this.userLoginService.isUserLoggedIn()
    this.role=localStorage.getItem('role');
  }

  getAllSubjects(){
    this.adminService.getAllSubjects().subscribe(
      data=>{
        this.subjectList=data;
        this.subjectList=JSON.stringify(this.subjectList);
        this.subjectList=JSON.parse(this.subjectList);
       // console.log(this.subjectList);

      }
     )
  }
  
}
