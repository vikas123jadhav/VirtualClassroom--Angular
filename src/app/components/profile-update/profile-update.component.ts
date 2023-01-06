import { Component, OnInit } from '@angular/core'; 
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';
import { AdminServiceService } from 'src/app/services/Admin-Service/admin-service.service';
import { StudentServiceService } from 'src/app/services/Student-Service/student-service.service';

import { Form, FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { whiteSpaceVallidator } from 'src/app/Custom-Validators/whiteSpaceVallidator.validator';
import { userNameSpecialCharValidator } from 'src/app/Custom-Validators/userNameSpecialCharValidator.validator';
import { noSpecialCharacter } from 'src/app/Custom-Validators/noSpecialCharacter.validator';
 
   
 

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  user = {
    id:'',
    username: '',
    password:'',
    name: '',
    mobileNo: '',
    email: '',
    status: '',
    role: '',
    age: '',
  } 
  newUser: any;
  userName:any;

  constructor(private userService: LoginServiceService,
    private adminServices: AdminServiceService,
    private studentService: StudentServiceService,
    private snack: MatSnackBar,
    private router: Router,
    private loginService: LoginServiceService,private _router: ActivatedRoute,) { }

  ngOnInit(): void {
   
    
    this.userName=this._router.snapshot.params['username'];
    // this.loginService.getCurrentUser(this.userName).subscribe(
    //   (data:any)=>{
    //     console.log("current user")
    //     console.log(data);
    //        this.user=data;
    //       this.user.name=data.name;
    //     // console.log("current user:"+this.user.id)

    //   },
    //   (error:any)=>{
    //     console.log(error);
    //   }
    // );

    let Currentuser=localStorage.getItem('user');
    //console.log(Currentuser)

    this.user=this.loginService.getUser();
  }

  
 
 

  formSubmit(action:any){}

  
  update(action:string) {
    let role=this.user.role;
    if (role == 'admin') {
        this.checkUserName(this.user.username);
      this.adminServices.createAdmin(this.user, action).subscribe(
        (data: any) => {
         // console.log("role"+data);
          this.newUser = data;
          this.newUser = JSON.stringify(this.newUser);
          localStorage.setItem("user", this.newUser);
          localStorage.setItem('name',data.name);
          this.swalFileSuccess(role);
 

        },
        (error) => {
          console.log(error);
          this.snackErrorOpen();
        }
      );
    }

    else if(role=='faculty'){
      this.checkUserName(this.user.username);
    this.adminServices.createFaculty(this.user, action).subscribe(
   (data:any)=>{
     //console.log(data);
     this.newUser=data;
     this.newUser=JSON.stringify(this.newUser);
     localStorage.setItem("user" , this.newUser);
     localStorage.setItem('name',data.name);
     this.swalFileSuccess(role);
     
   },
   (error)=>{
    console.log(error);
    this.snackErrorOpen(); 
   }
   );
    }
  

  else if(role=='student'){

    this.checkUserName(this.user.username);
    
    //console.log("calling student service");

   this.studentService.createStudent(this.user, action).subscribe(
     (data:any)=>{
       console.log(data);
       this.newUser=data;
       this.newUser=JSON.stringify(this.newUser);
       localStorage.setItem("user" , this.newUser);
       localStorage.setItem('name',data.name);
       this.swalFileSuccess(role);
       
       
     },
     (error)=>{
      console.log(error);

      this.snackErrorOpen();
     
     }
     );



  }

  }


private checkUserName(userName:any){
  if (this.user.username == '' || this.user.username == null) {
    this.snack.open('User name is Required !! ','',{
      duration:3000,
      verticalPosition:'top',
      horizontalPosition:'right',
     
    });
    return;
  }
}

 private swalFileSuccess(role:any){
// alert('success');
Swal.fire('Successfully done !!', role+' is Updated', 'success').then((e) => {
  // this.router.navigateByUrl('myProfile');
  window.location.href="/myProfile";

});
 }


 private snackErrorOpen(){
// alert('someting went wrong');
this.snack.open('Something Went wrong !!','',{
  duration:3000,
})

 }

 //=======================================================================

 public admin={
  name:'',
  username: '',
  age:'',
  password: '',
  mobileNo: '',
  email: '',
};

 

registerform = new FormGroup({

  NAME : new FormControl("" , [
    Validators.required, 
    Validators.minLength(5),                           
    Validators.pattern("[a-zA-Z].*"),
    noSpecialCharacter.noSpecialChar
  ]),

  
  AGE: new FormControl("",[
    Validators.required,
    Validators.pattern("[0-9]*"),
    Validators.min(10),
    Validators.max(50)
  ]),

  USERNAME : new FormControl("",[
    Validators.required,
    Validators.pattern("[a-zA-Z0-9]*.(@gmail|@yahoo|@solugenix).com"),
    userNameSpecialCharValidator.userNameSpeChar
  ]),

  PASSWORD: new FormControl("",[
    Validators.required,
    Validators.minLength(8),     
    Validators.maxLength(16),
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
    whiteSpaceVallidator.cannotContainSpace
  ]),

  confirmPassword: new FormControl("",[Validators.required]),


  MOBILENO : new FormControl("",[
    Validators.required,
    Validators.pattern("[0-9]*"),
    Validators.minLength(10),
    Validators.maxLength(10)
  ]),

  EMAIL : new FormControl("",[
    Validators.required,
    Validators.pattern("[a-zA-Z0-9]*.(@gmail|@yahoo|@solugenix).com"),
    userNameSpecialCharValidator.userNameSpeChar
  ]),

  
});



get Name(){
  return this.registerform.get("NAME") as FormControl;
 }
 get Userame(){
  return this.registerform.get("USERNAME") as FormControl;
 }
 get Age(){
  return this.registerform.get("AGE") as FormControl;
 }
 get Password(){
  return this.registerform.get("PASSWORD") as FormControl;
 }
 get ConfirmPassword(){
  return this.registerform.get("confirmPassword") as FormControl;
 }
 get MobileNo(){
  return this.registerform.get("MOBILENO") as FormControl;
 }
 get Email(){
  return this.registerform.get("EMAIL") as FormControl;
 }




 registerSubmited(){
  //console.log(this.registerform.value);

 }
}
