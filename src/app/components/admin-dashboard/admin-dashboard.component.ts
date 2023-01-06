import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/Admin-Service/admin-service.service';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';
import { SuccessErrorOpenService } from 'src/app/services/SuccErrorOpen/success-error-open.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionAnswerServiceService } from 'src/app/services/QA/question-answer-service.service';
import { noSpecialCharacter } from 'src/app/Custom-Validators/noSpecialCharacter.validator';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  
  page : number=1;
  count : number=0;
  tableSize: number= 5;
  tableSizes: any=[5,10,15,20,25]
   
                              
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sortt!: MatSort;

  
  orderHeader : String ='';
  isDescOrder : boolean = true;
  searchInput :any= { name:'' , username:'',mobileNo:'',age:'' }
  searchFileInput: any={ fileName:'' ,fileType:''}
  searchSubjectInput: any={subject:''}
  searchAnswerInput :any={answer:'',ansId:'' }
  searchQuestionInput : any={question:'' ,askedId:''}


  facultyLists: any;
  adminLists: any;
  studentLists: any;
  pptVideoLists: any;
  subjectList:any;

  questionList:any;
  answerList:any;

  activateSubjectAdd:any;

  deleteResult: any;
  token: any;
  
  name:any;
  
  details: any; 

  newAdminData: any; 

  newSubject = {
    subject:''
  }

  p:number = 1;

  constructor(private adminServices: AdminServiceService, private loginService: LoginServiceService,private login:LoginServiceService,
    private router: Router, private snack: MatSnackBar,private sucErr: SuccessErrorOpenService,private qa:QuestionAnswerServiceService) { }

  ngOnInit(): void {
    this.newAdminData = null;
    // this.name=localStorage.getItem('name');  
    this.name=this.login.getUser().name;
    
    this.token = this.loginService.getToken();
    //console.log(this.token);
    if (this.token == undefined || this.token == '' || this.token == null) {
      // console.log('token  not generated-dashboard');
    }
    else {
      // console.log('token getting succfully in -dashboard');
      // console.log(this.token);
    }
  }

  sort(headerName:String){ 
       this.isDescOrder= !this.isDescOrder;
       this.orderHeader=headerName;
  }
  
  getAllFaculties() {
    this.clearOld();
    this.deleteResult = '';
    this.adminServices.getAllFaculties().subscribe(
      facultyList => {
        this.facultyLists = facultyList;          
        // this.facultyLists=[this.facultyLists];
        this.facultyLists = JSON.stringify(this.facultyLists);
        this.facultyLists = JSON.parse(this.facultyLists);
        // console.log(this.facultyLists);

        // this.dataSource=new MatTableDataSource(this.facultyLists)
        // this.dataSource.paginator=this.paginator;
        // this.dataSource.sort=this.sort;
      },
      error => {
        console.log("error in Faculty List Fetching !!")
        console.log(error);
      }
    )
  }

  applyFilter(event:any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // for pagination
  onTableDataChange(event:any){
    this.page=event;
  }

  onTableSizeChange(event:any){
    this.tableSize=event.target.value;
    this.page=1;
  }

 
  clearOld() {
    this.facultyLists = null;
    this.adminLists = null;
    this.studentLists = null;
    this.pptVideoLists = null;
    this.subjectList=null;
    this.activateSubjectAdd=null;
    this.deleteResult = '';
    this.details=null;

    this.questionList=null;
    this.answerList=null;

    localStorage.removeItem('newAdmin');
  }

  getAllAnswerList(){
      this.clearOld();
      this.qa.getAllAnswerList().subscribe(
         (answers:any)=>{
         // console.log(answers);
          this.answerList=answers;
          // this.answerList=JSON.stringify(this.adminLists);
          // this.answerList=JSON.parse(this.answerList);
          //console.log(this.answerList);
         },
         error=>{
          console.log("error in Answer List Fetching ");
          console.log(error);
         }
      )
  }
  getAllQuestionList(){
    this.clearOld();
    this.qa.getAllQuestionList().subscribe(
       (questions:any)=>{
     //   console.log(questions)
        this.questionList=questions;
        // this.questionList=JSON.stringify(this.questionList);
        // this.questionList=JSON.parse(this.questionList);
       // console.log(this.questionList);
       },
       error=>{
        console.log("error in Question List Fetching ");
        console.log(error);
       }
    )
  }

  getAllAdmins() {
    this.clearOld(); 
    this.adminServices.getAllAdmins().subscribe(
      adminList => {
        this.adminLists = adminList;
        // this.adminLists = JSON.stringify(this.adminLists);
        // this.adminLists = JSON.parse(this.adminLists);
        //console.log(this.adminLists);
      },
      error => {
        console.log("error in Admin List Fetching ");
        console.log(error);
      }
    )
  }

  getAllStudents() {
    this.clearOld();
    this.deleteResult = '';
    this.adminServices.getAllStudents().subscribe(
      studentList => {
        this.studentLists = studentList;
        // this.studentLists = JSON.stringify(this.studentLists);
        // this.studentLists = JSON.parse(this.studentLists);
       // console.log(this.studentLists);
      },
      error => {
        console.log("error in Student List Fetching ");
        console.log(error);
      }
    )
  }

 

  getAllFiles(type: any) {
    //console.log("ts getAllFiles method")
    this.clearOld();
    this.deleteResult = '';
    this.adminServices.getAllFiles(type).subscribe(
      files => {
        this.pptVideoLists = files;
        // this.pptVideoLists = JSON.stringify(this.pptVideoLists);
        // this.pptVideoLists = JSON.parse(this.pptVideoLists);
      //  console.log(this.pptVideoLists);
      }
    )
  }

  registerSubject= new FormGroup({
    SUBJECT : new FormControl("" , [
      Validators.required, 
      // Validators.minLength(5),                           
      Validators.pattern("[a-zA-Z].*"),
      noSpecialCharacter.noSpecialChar
    ])
  
  })

  get Subject(){
    return  this.registerSubject.get("SUBJECT") as FormControl;
   }

  storeSubject(){
    this.clearOld();

       this.adminServices.saveSubject(this.newSubject).subscribe(
      (data:any)=>{
        console.log(data);
        // alert('success');
        Swal.fire('Successfully Added !!','Successfuly  Added','success' ).then((e)=>{
          this. activateSubjectStore(); 
        });
 
      },
      (error)=>{
       console.log(error);
      // alert('someting went wrong');
      this.snack.open('','Subject Already Available, Try with Different',{
        duration:5000,
      }) 
      this.activateSubjectStore();
      this.newSubject.subject='';
      }
      );
  }

  getAllSubjects(){
       this.clearOld();

       this.adminServices.getAllSubjects().subscribe(
        data=>{
          this.subjectList=data;
          // this.subjectList=JSON.stringify(this.subjectList);
          // this.subjectList=JSON.parse(this.subjectList);
          //console.log(this.subjectList);
     
        }
       )
  }

  deleteSubject(id:any){

    Swal.fire({
      icon:'question',
      title:'Are You Certain you want to delete ?',
      cancelButtonText:'Cancel',
      showCancelButton:true,
     }).then((result)=>{
          if(result.isConfirmed){
            this.adminServices.deleteSubject(id).subscribe(
              result=>{
                if(result){
                  Swal.fire('Successfully Deleted !!','Successfuly  Deleted','success' ).then((e)=>{
                    this.getAllSubjects(); 
                  });
                }
                else {
                  this.snack.open('Not Found !!', 'Enable to Delete', {
                    duration: 5000,
                  })
                }
              },
              error => {
                console.log("error in Deleting Subject");
                this.snack.open('Something Went wrong !!', 'Enable to Delete', {
                  duration: 5000,
                 
                })
                
              }
             )
           
            
          }
     })
         
         
  }

  toAdminCreationComponent() {
    this.router.navigateByUrl('/adminCreation');
  }

  toFacultyCreationComponent() {
    this.router.navigateByUrl('/facultyCreation');
  }
 
  activateSubjectStore(){
    this.clearOld(); 
    this.activateSubjectAdd=true;
  }

  toFileUplodingComp(){
    this.router.navigateByUrl('/fileUploading');
}

  deleteById(id: any, role: any) {

    Swal.fire({
      icon:'question',
      title:'Are You Certain you want to delete ?',
      cancelButtonText:'Cancel',
      showCancelButton:true,
     }).then((result)=>{
          if(result.isConfirmed){
                       //console.log(id, role);
    this.adminServices.deleteById(id, role).subscribe(
      deletedResult => {

        if (deletedResult) {
          this.deleteResult = "Successufully Deleted having ID :: " + id; 
          Swal.fire('Successfully done !!','Successfuly  Deleted','success' ).then((e)=>{
            if (role == 'admin') this.getAllAdmins();
            else if (role == 'faculty') this.getAllFaculties();
            else if (role == 'student') this.getAllStudents();
          });
          // if (role == 'admin') this.getAllAdmins();
          // else if (role == 'faculty') this.getAllFaculties();
          // else if (role == 'student') this.getAllStudents();
        }
        else {
          this.snack.open('Not Found !!', 'Enable to Delete', {
            duration: 5000,
          })
        }

      },
      error => {
        console.log("error in Deleting Account");
        this.snack.open('Something Went wrong !!', 'Enable to Delete', {
          duration: 5000,
        })
      }
    )
           
            
          }
     })

    
  }

  deletePVbyId(pvid: any, type: any) {

    Swal.fire({
      icon:'question',
      title:'Are You Certain you want to delete ?',
      cancelButtonText:'Cancel',
      showCancelButton:true,
     }).then((result)=>{
          if(result.isConfirmed){
            this.adminServices.deletePVbyId(pvid).subscribe(
              deletedDoc => {
                if (deletedDoc) {
                  this.deleteResult = "Successfully Deleted having ID::" + pvid; 
                  Swal.fire('Successfully done !!','Successfuly  Deleted','success' ).then((e)=>{
                  if (type == 'bothTypes') this.getAllFiles('bothTypes');
                  else if (type == 'ppt') this.getAllFiles('ppt');
                  else if (type == 'video') this.getAllFiles('video');
                  });
                }
                else
                  this.snack.open('Not Found !!', 'Enable to Delete', { duration: 5000, })
              },
              error => {
                console.log("error in Deleting Account");
                this.snack.open('Something Went wrong !!', 'Enable to Delete', {duration: 5000, })
              }
            )   
           
            
          }
     })

    
  }

  deleteAnswer(ansId:any){
       Swal.fire({
        icon:'question',
      title:'Are You Certain you want to delete ?',
        cancelButtonText:'Cancel',
        showCancelButton:true,
       }).then((result)=>{
            if(result.isConfirmed){
                
              this.qa.deleteAnswerById(ansId).subscribe(
                result=>{
                  if(result){
                    Swal.fire('Successfully done !!','Successfuly  Deleted','success' ).then((e)=>{ this.getAllAnswerList()})
                  }
                }
                ,
            error => {
              console.log("error in Deleting Account");
              this.snack.open('Something Went wrong !!', 'Enable to Delete', {duration: 5000, })
            }
              ) 

            }
       })


      
  } 

  deleteQuestion(queId:any){

    Swal.fire({
      icon:'question',
      title:'Are You Certain you want to delete ?',
      cancelButtonText:'Cancel',
      showCancelButton:true,
     }).then((result)=>{
          if(result.isConfirmed){
            this.qa.deleteQuestionById(queId).subscribe(
              result=>{
                if(result){
                  Swal.fire('Successfully done !!','Successfuly  Deleted','success' ).then((e)=>{ this.getAllAnswerList()})
                }
              }
              ,
          error => {
            console.log("error in Deleting Account");
            this.snack.open('Something Went wrong !!', 'Enable to Delete', {duration: 5000, })
          }
            ) 
           
            
          }
     })

  
  }
  

}
