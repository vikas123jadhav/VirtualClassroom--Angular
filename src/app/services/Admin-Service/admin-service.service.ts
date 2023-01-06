import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  
  baseUrl="http://localhost:4040"
  constructor(private http: HttpClient) { }


  public createAdmin(admin: any , action:string){
    return this.http.post(`http://localhost:4040/admin/createAdmin?action=${action}`,admin);
  }

  public createFaculty(faculty: any , action:string){
    return this.http.post(`http://localhost:4040/admin/createFaculty?action=${action}`,faculty);
  }

  public getAllFaculties(){
    return this.http.get(`${this.baseUrl}/admin/showAllFaculties`);
  }
  
  getAllAdmins(){
    return this.http.get(`${this.baseUrl}/admin/showAllAdmin`);
  }

  getAllStudents(){
    return this.http.get(`${this.baseUrl}/admin/showAllStudents`);
  }

  saveSubject(subjectObject:any){
    return this.http.post(`http://localhost:4040/admin/saveSubject`, subjectObject);
  }

  getAllSubjects(){
    return this.http.get(`http://localhost:4040/admin/getAllSubjects`);
  }

  deleteSubject(id:any){
    return this.http.delete(` http://localhost:4040/admin/deleteSubject/`+id);
  }


getAllFiles(type:any){
 // console.log("service getAllFiles method")
  let result= this.http.get(`http://localhost:4040/getAllFiles/`+type);
  //console.log(result);
  return result;
}


 deleteById(id:any ,role:any){
  //console.log('api calling',id)
    let result= this.http.delete(`http://localhost:4040/admin/deleteAccountsById?id=${id}&role=${role}`);
    //console.log(result);
    return result;
 }

 deletePVbyId(pvid:any){
   return this.http.delete(`http://localhost:4040/deletePptORVideoById?pvid=${pvid}`)

 }
}
