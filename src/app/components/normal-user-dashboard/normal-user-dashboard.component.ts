import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/Admin-Service/admin-service.service';
import { FileServiceService } from 'src/app/services/File-Service/file-service.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-normal-user-dashboard',
  templateUrl: './normal-user-dashboard.component.html',
  styleUrls: ['./normal-user-dashboard.component.css']
})
export class NormalUserDashboardComponent implements OnInit {

  fileStatus = { status: '', requestType: '', percent: 0 };
  filenames: string[] = [];

  url:any = "";

  pptVideoLists: any;
  constructor( private adminServices:AdminServiceService , private fileService:FileServiceService) { }

  showDisplayBlock=false;

  ngOnInit(): void {
       
   // let reader= new FileReader();
    // this.url=""
  
  }

  clearOld() { 
    this.pptVideoLists = null;
  }


  getAllFiles(type: any) {
    //console.log("ts getAllFiles method")
    this.clearOld();
    
    this.adminServices.getAllFiles(type).subscribe(
      files => {
        this.pptVideoLists = files;
        this.pptVideoLists = JSON.stringify(this.pptVideoLists);
        this.pptVideoLists = JSON.parse(this.pptVideoLists);
        console.log(this.pptVideoLists);
      }
    )
  }

   // define a function to download files
   download(filename: string): void {
    this.fileService.download(filename).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  // displayVideo(fileName:string):void {
  //     this.showDisplayBlock=false;
  //     this.fileService.download(fileName).subscribe(
  //      (event :any)=>{
  //          if(!event.target.files[0] || event.target.files[0].length ==0){
  //           return;
  //          }

  //          let mimeType= event.target.files[0].type;
  //          if(mimeType.match(/video\/*/) == null ){
  //           return;
  //          }

  //          let reader = new FileReader();
  //          reader.readAsDataURL(event.target.files[0]);
  //          reader.onload= (_event)=>{
  //            this.url= reader.result;
  //          }
  //       },
  //       (error:HttpErrorResponse)=>{
  //         console.log(error);
  //       }
  //     )
  // }



  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          // saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
          //         {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
          saveAs(new Blob([httpEvent.body!], 
            { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
             httpEvent.headers.get('File-Name')!);
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
    
    


}
