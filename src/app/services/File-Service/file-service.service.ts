import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

    
  
  constructor(private http: HttpClient) { 
    
  }
 
 

  public getFileById(pvid:any){
    return this.http.get('http://localhost:4040/getFileById/'+pvid)
  }

//   public uploadFile(subject:any,type:any, formData:FormData): Observable<HttpEvent<string>>{
//     return      this.http.post<string>(`http://localhost:4040/uploadFile/${subject}/${type}` ,formData,{
//        reportProgress:true,
//        observe: 'events',
//     });
   
//  }

public uploadFile(subject:any,type:any,uploadedId:any,uploadedByUsername:any,uploadedRole:any, formData:FormData): Observable<HttpEvent<string>>{
  return      this.http.post<string>(`http://localhost:4040/uploadFile/${subject}/${type}/${uploadedId}/${uploadedByUsername}/${uploadedRole}` ,formData,{
     reportProgress:true,
     observe: 'events',
  });
 
}

 public uploadUpdatedFile(pvid:any, subject:any,uploadedId:any,uploadedByUsername:any,uploadedRole:any, type:any,formData:FormData): Observable<HttpEvent<string>>{
  return      this.http.post<string>(`http://localhost:4040/uploadUpdateFile/${subject}/${type}/${pvid}/${uploadedId}/${uploadedByUsername}/${uploadedRole}` ,formData,{
    reportProgress:true,
    observe: 'events'
   })
  }

  

  // define function to download files
  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`http://localhost:4040/download/${filename}`, { 
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
      
    });
 }
 
 getFileByUploaderId(uploaderId:any){
  return this.http.get(`http://localhost:4040/getFilesByUploader/${uploaderId}`)
 }
}
