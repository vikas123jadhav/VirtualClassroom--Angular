import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminServiceService } from '../Admin-Service/admin-service.service';

@Injectable({
  providedIn: 'root'
})
export class fetchSubjects {

    subjectList:any;

    constructor(  private adminService:AdminServiceService){

    }
    
    getAllSubjects():any{
        this.adminService.getAllSubjects().subscribe(
          data=>{
            this.subjectList=data;
            this.subjectList=JSON.stringify(this.subjectList);
            this.subjectList=JSON.parse(this.subjectList);
           // console.log("from service")
            //console.log(this.subjectList);
    
          }
         )

         return this.subjectList;
    }
}
