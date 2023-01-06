import { HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileServiceService } from 'src/app/services/File-Service/file-service.service';
import { HttpErrorResponse,   HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { SuccessErrorOpenService } from 'src/app/services/SuccErrorOpen/success-error-open.service';
import { noSpecialCharacter } from 'src/app/Custom-Validators/noSpecialCharacter.validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from 'src/app/services/Admin-Service/admin-service.service';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';
 



@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  subject='';
  type='';
  role:any;
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  subjectList:any;

 user:any;

  constructor(private router:Router , private fileService:FileServiceService,
    private sucErr:SuccessErrorOpenService,private snack:MatSnackBar,private adminService:AdminServiceService,private login:LoginServiceService ) { }

  ngOnInit(): void {
      this.role=localStorage.getItem('role');
      this.getAllSubjects();

      this.user=this.login.getUser();
  }
  
   
  public userFile:any =File;
  
  registerform = new FormGroup({

    SUBJECT : new FormControl("" , [
      Validators.required, 
      Validators.minLength(2),                           
      Validators.pattern("[a-zA-Z].*"),
      noSpecialCharacter.noSpecialChar
    ]),
  
    TYPE : new FormControl("" ,[Validators.required]), 

    FILE: new FormControl("" ,[Validators.required, Validators.minLength(15)] )

  });

  get Subject(){
    return this.registerform.get("SUBJECT") as FormControl;
  }
  get Type(){
    return this.registerform.get("TYPE") as FormControl;
  }
  get File(){
    return this.registerform.get("FILE") as FormControl;
  }

  onUploadFile(event:any):void{
    //console.log(event)
    const file=event.target.files[0];
    this.userFile = file;
   // console.log(event.target.files[0]);
   // console.log("userFile" + this.userFile)

  let  fileType= event.target.files[0].type;

    if(this.type=='ppt'){
         if(event.target.files[0].type=='application/pdf' || event.target.files[0].type=='text/plain' 
                || event.target.files[0].type=='application/msword') 
                        console.log("valid file ")
    else{
        Swal.fire('Error','Invalid File Format,Choose pdf,doc,text,msword Only','error').then((e)=>{
               event.target.value=null;
        })
      }
    }
   else if(this.type=='video' ){
           if(event.target.files[0].type=='video/mp4'  ) 
                  console.log("valid file ")
          else{
                  Swal.fire('Error','Invalid File Format,Choose video/mp4  Only','error').then((e)=>{
                    event.target.value=null;
                            })
                 }
    }
   
         
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

  uploade(){
    const formData= new FormData();
    formData.append('file',this.userFile);
  
    // this.fileService.uploadFile(this.subject,this.type,formData).subscribe(
      this.fileService.uploadFile(this.subject,this.type,this.user.id,this.user.username,this.user.role,formData).subscribe(
      event=>{ 

        console.log(event);
        //this.resportProgress(event);
        Swal.fire('Successfully done !!','Successfuly  Uploaded','success' ).then((e)=>{
          //this.router.navigateByUrl('fileUploading');
          if(this.role=='admin') window.location.href="/fileUploading";
          else if(this.role='faculty') window.location.href="/fileUploadingFaculty";
          
        });
      },
      error=>{
       // Swal.fire('Error','ERROR in File Upload','error');
        console.log(error);
       // this.sucErr.snackErrorOpen();
      }
    );
  }
 

  // define a function to download files
  onDownloadFile(filename: string): void {
    this.fileService.download(filename).subscribe(
      event => {
       // console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private resportProgress(httpEvent: HttpEvent<string | Blob>): void {
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      // case HttpEventType.DownloadProgress:
      //   this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
      //   break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        // if (httpEvent.body instanceof Array) {
          if(httpEvent.body instanceof String){
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }

         //  this.filenames.push(httpEvent);
        } else {
          // saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
          //         {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
        }
        this.fileStatus.status = 'done';
        break;
        default:
          console.log(httpEvent);
          break;
      
    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

toDashBoard(){
    if(this.role == 'admin')  this.router.navigateByUrl('adminDashboard');
    else if(this.role == 'faculty') this.router.navigateByUrl('facultyDashboard')
}
  

}
