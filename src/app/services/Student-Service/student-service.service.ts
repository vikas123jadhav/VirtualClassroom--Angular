import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  baseurl="http://localhost:4040/user/"
  constructor(private http: HttpClient) { }


  public createStudent(student: any , action:string){
    return this.http.post(`http://localhost:4040/student/createStudent?action=${action}`,student);
  }
}
