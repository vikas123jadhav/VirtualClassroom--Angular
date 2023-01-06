import { Component, OnInit } from '@angular/core';
import  Swal from 'sweetalert2';
import { HttpEvent } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse,   HttpEventType } from '@angular/common/http';
 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileServiceService } from 'src/app/services/File-Service/file-service.service';
import { noSpecialCharacter } from 'src/app/Custom-Validators/noSpecialCharacter.validator';
import { AdminServiceService } from 'src/app/services/Admin-Service/admin-service.service';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';

@Component({
  selector: 'app-file-update',
  templateUrl: './file-update.component.html',
  styleUrls: ['./file-update.component.css']
})
export class FileUpdateComponent implements OnInit {

  pvid=0;
  fileEntity=0;

  subject='';
  type='';
  fileName='';
  user:any;
  
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  subjectList:any;
  
  constructor( private _router: ActivatedRoute,  
    private fileManu: FileServiceService,
    private router:Router ,private adminService:AdminServiceService,private login:LoginServiceService) { }

   
  ngOnInit(): void {
    this.user=this.login.getUser();
    this.pvid=this._router.snapshot.params['pvid'];

    this.fileManu.getFileById(this.pvid).subscribe(
      (data:any)=>{
        this.fileEntity=data;
       // console.log(this.fileEntity);
        this.subject=data.subject;
        this.type=data.type;
        this.fileName=data.fileName;
      },
      (error:any)=>{
        console.log(error)
      }
    );

}
  public userFile:any =File;
  
   
  registerform = new FormGroup({

    // SUBJECT : new FormControl("" , [
    //   Validators.required, 
    //   Validators.minLength(2),                           
    //   Validators.pattern("[a-zA-Z].*"),
    //   noSpecialCharacter.noSpecialChar
    // ]),
  
    //TYPE : new FormControl("" ,[Validators.required]), 

    FILE: new FormControl("" ,[Validators.required, Validators.minLength(15)] )

  });

  // get Subject(){
  //   return this.registerform.get("SUBJECT") as FormControl;
  // }
  // get Type(){
  //   return this.registerform.get("TYPE") as FormControl;
  // }
  get File(){
    return this.registerform.get("FILE") as FormControl;
  }

  onUploadFile(event:any):void{
   // console.log(event)
    const file=event.target.files[0];
    this.userFile = file;
   // console.log(file);

    if(this.type=='ppt'){
         if(event.target.files[0].type=='application/pdf' || event.target.files[0].type=='text/plain' 
                || event.target.files[0].type=='application/msword') 
                        console.log("valid file ")
    else{
        Swal.fire('Error','Invalid File Type,Choose pdf,doc,text,msword Only','error').then((e)=>{
          event.target.value=null;
        })
      }
    }
   else if(this.type=='video' ){
           if(event.target.files[0].type=='video/mp4'  ) 
                  console.log("valid file ")
          else{
                  Swal.fire('Error','Invalid File Type,Choose video/mp4  Only','error').then((e)=>{
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

//  uploade(){
//     const formData= new FormData();
//     formData.append('file',this.userFile);
//     this.fileManu.uploadFile(this.subject,this.type,formData).subscribe(
//       event=>{
//         // window.alert("Material Succefully Uploaded ...!");
//         // this.router.navigateByUrl('adminDashboard');

//         console.log(event);
//         this.resportProgress(event);
//         Swal.fire('Successfully done !!','Successfuly  Uploaded','success' ).then((e)=>{
//           this.router.navigateByUrl('fileUploading');
//           window.location.href='adminDashboard/updateFile/'+
//         });

//       },
//       error=>{
//         console.log(error);
//       }
//     );
//   }
 

   
    // update file
    public updateFile(){
          const formData= new FormData();
           formData.append('file',this.userFile);

          this.fileManu.uploadUpdatedFile(this.pvid, this.subject,this.user.id,this.user.username,this.user.role, this.type,formData).subscribe(
            event=>{
             // console.log(event);
              //this.resportProgress(event);
              Swal.fire('Successfully done !!','Successfuly  Updated','success' ).then((e)=>{
                this.router.navigateByUrl('adminDashboard');
                //window.location.href='adminDashboard/updateFile/'+this.pvid;
              });
          },
          (error:any)=>{
          //  Swal.fire('Error','ERROR in File Uploaded having id ::'+this.pvid,'error');
            console.log(error);
          }
          )
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
    this.router.navigateByUrl('adminDashboard');
}

}
