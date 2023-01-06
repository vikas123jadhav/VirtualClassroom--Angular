import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentServiceService } from 'src/app/services/Student-Service/student-service.service';
import { SuccessErrorOpenService } from 'src/app/services/SuccErrorOpen/success-error-open.service';


 
import { Router } from '@angular/router';  
import Swal from 'sweetalert2'; 
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { whiteSpaceVallidator } from 'src/app/Custom-Validators/whiteSpaceVallidator.validator';
import { userNameSpecialCharValidator } from 'src/app/Custom-Validators/userNameSpecialCharValidator.validator';
import { noSpecialCharacter } from 'src/app/Custom-Validators/noSpecialCharacter.validator';
 
 
@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {


  newStudent:any;

  constructor(private snack:MatSnackBar , private studentServices: StudentServiceService , private router:Router,
    private sucErr: SuccessErrorOpenService) { }


    public student={
    name:'',
    username: '',
    age:'',
    password: '',
    mobileNo: '',
    email: '',
  };

  ngOnInit(): void {
  }

  registerform = new FormGroup({

    NAME : new FormControl("" , [
      Validators.required, 
      Validators.minLength(2),                           
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
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
      Validators.minLength(8),
      Validators.maxLength(16),
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


  formSubmit(action:string){
     
     //console.log("calling student service");

    this.studentServices.createStudent(this.student, action).subscribe(
      (data:any)=>{
      //  console.log(data);
        this.newStudent=data;
        this.newStudent=JSON.stringify(this.newStudent);
        localStorage.setItem("newStudent" , this.newStudent);

          // alert('success');
          this.sucErr.swalSuccessFire('Student');
      },
      (error)=>{
       console.log(error); 
          this.sucErr.snackErrorOpen();
      }
      );
  }

}
