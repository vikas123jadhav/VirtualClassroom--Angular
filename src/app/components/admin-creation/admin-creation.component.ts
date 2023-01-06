import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Form, FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from 'src/app/services/Admin-Service/admin-service.service';
import { SuccessErrorOpenService } from 'src/app/services/SuccErrorOpen/success-error-open.service';
import { Router } from '@angular/router';
import { whiteSpaceVallidator } from 'src/app/Custom-Validators/whiteSpaceVallidator.validator';
import { userNameSpecialCharValidator } from 'src/app/Custom-Validators/userNameSpecialCharValidator.validator';
import { noSpecialCharacter } from 'src/app/Custom-Validators/noSpecialCharacter.validator';
 
   

@Component({
  selector: 'app-admin-creation',
  templateUrl: './admin-creation.component.html',
  styleUrls: ['./admin-creation.component.css']
})
export class AdminCreationComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  newAdmin:any;

  constructor(private snack:MatSnackBar , private adminServices: AdminServiceService , private router:Router,
             private sucErr: SuccessErrorOpenService,
             private fb: FormBuilder) { 

              this.form = fb.group({
                PASSWORD: ['', [Validators.required]],
                confirm_password: ['', [Validators.required]]
              }, { 
              //  validator: ConfirmedValidator('PASSWORD', 'confirm_password')
              })

          }

      get f(){
        return this.form.controls;
      }


  
  public admin={
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
    console.log(this.registerform.value);
  
   }
   
  formSubmit(action:string){
     console.log(this.admin)
     
    this.adminServices.createAdmin(this.admin, 'create').subscribe(
      (data:any)=>{
        console.log(data);
        this.newAdmin=data;
        this.newAdmin=JSON.stringify(this.newAdmin);
        localStorage.setItem("newAdmin" , this.newAdmin);

       // alert('success');
       this.sucErr.swalSuccessFire('Admin');
 
      },
      (error)=>{
       console.log(error);
      // alert('someting went wrong');
        this.sucErr.snackErrorOpen();
      }
      );
  }

  toDashBoard(){
  this.router.navigateByUrl('adminDashboard'); 
}
}
