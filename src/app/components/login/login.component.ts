import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  result:any;
  role:any;
  name:any;
 
  public loggedIn=false;

   public userLoginData={
     username:'',
     password:''
    };
 
   constructor(private loginService:LoginServiceService ,private snack:MatSnackBar  ) { }
 
   ngOnInit(): void {
    this.loggedIn=this.loginService.isUserLoggedIn();
   }
 
   onSubmit(){
     
     //console.log("form is submitted");
     
     if((this.userLoginData.username!='' && this.userLoginData.password!='') 
              && (this.userLoginData.username!=null && this.userLoginData.password!=null))        
        {
 
       console.log("We have to Submit the form to serve !!");
 
       //token generate
       this.loginService.generateToken(this.userLoginData).subscribe(
         (response:any)=>{
            //when successfully token generated
            //console.log("Success");
            //console.log(response);
            
            this.loginService.loginUser(response);
 
            this.loginService.getCurrentUser(this.userLoginData.username).subscribe(
             (user:any)=>{
              // console.log(user);
               user=JSON.stringify(user);
               localStorage.setItem('user',user);
 
               user=JSON.parse(user);   
               localStorage.setItem('role',user.role);
               localStorage.setItem('name',user.name);
 //  ------------------------------------------------------------
               this.role=localStorage.getItem('role');
               //console.log(this.role);
               
               if(this.role=='admin')  window.location.href="/adminDashboard"
               else if(this.role=='faculty') window.location.href="/facultyDashboard"          
               else if(this.role=='student')  window.location.href="/studentDashboard"
              
             }
            )
       
         },
         error=>{
           //when successfully token NOT generated
           console.log("error!!")
           console.log(error);
           this.snack.open('Invalid Credentials!!','Try Again',{
            duration:3000,
          }) 
         }        
       )
       }
     else{
       console.log("Fields are Empty !!");
       this.snack.open('Fields are Empty!!','Try Again',{
        duration:3000,
      }) 
     }
 
   }

   toDashBoard(){
          if(this.role=='admin')             window.location.href="/adminDashboard";
          else if(this.role=='faculty')      window.location.href="/normalUserDashboard";
          else if(this.role=='student')      window.location.href="/normalUserDashboard";
   }

    
   

}
