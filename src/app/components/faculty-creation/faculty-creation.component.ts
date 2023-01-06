import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; 
 
import Swal from 'sweetalert2';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/Admin-Service/admin-service.service';
import { Router } from '@angular/router';
import { SuccessErrorOpenService } from 'src/app/services/SuccErrorOpen/success-error-open.service';
import { whiteSpaceVallidator } from 'src/app/Custom-Validators/whiteSpaceVallidator.validator';
import { userNameSpecialCharValidator } from 'src/app/Custom-Validators/userNameSpecialCharValidator.validator';
import { noSpecialCharacter } from 'src/app/Custom-Validators/noSpecialCharacter.validator';
 

@Component({
  selector: 'app-faculty-creation',
  templateUrl: './faculty-creation.component.html',
  styleUrls: ['./faculty-creation.component.css']
})
export class FacultyCreationComponent implements OnInit {

  newFaculty:any;

  constructor(private snack:MatSnackBar , private adminCretionService: AdminServiceService , private router:Router,
    private sucErr: SuccessErrorOpenService) { }
 
  


  
  public faculty={
    name:'',
    username: '',
    age:'',
    subject:'',
    deptno:'',
    password: '',
    mobileNo: '',
    email: '',
  };
  
  subjectList:any;

  ngOnInit(): void {
    this.getAllSubjects();
  }

  getAllSubjects(){
    this.adminCretionService.getAllSubjects().subscribe(
      data=>{
        this.subjectList=data;
        this.subjectList=JSON.stringify(this.subjectList);
        this.subjectList=JSON.parse(this.subjectList);
        console.log(this.subjectList);

      }
     )
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

    DEPTNO : new FormControl("",
      [Validators.required ,
        Validators.pattern("[0-9]*"),
      ]),

    SUBJECT : new FormControl("" ,[
      Validators.required, 
      // Validators.minLength(2),                           
      // Validators.pattern("[a-zA-Z].*") 
    ])

  });

   registerSubmited(){
    console.log(this.registerform.value);
  
   }
 


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
   get Subject(){
    return this.registerform.get("SUBJECT") as FormControl;
   }

   get Deptno(){
    return this.registerform.get("DEPTNO") as FormControl;
   }


   formSubmit(action:string){
     
    this.adminCretionService.createFaculty(this.faculty,action  ).subscribe(
      (data:any)=>{
        //console.log(data);
        this.newFaculty=data;
        this.newFaculty=JSON.stringify(this.newFaculty);
        localStorage.setItem("newFaculty" , this.newFaculty);

     // alert('success');
     this.sucErr.swalSuccessFire('Faculty');

      },
      (error)=>{
       console.log(error);
       this.sucErr.snackErrorOpen();
      }
      );
  }

  toDashBoard(){
      this.router.navigateByUrl('adminDashboard');
     
}
}
