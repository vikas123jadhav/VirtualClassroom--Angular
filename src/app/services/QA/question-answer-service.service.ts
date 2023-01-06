import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionAnswerServiceService {

  constructor(private http: HttpClient) { }


  // for student
  public storeQuestion(questionEntity: any){  
      return      this.http.post<string>(`http://localhost:4040/storeQuestion` ,questionEntity);
  }

  // for student
  public getQuestionAnswerList(askedid:any){
    //askedid=124;
    return      this.http.get(`http://localhost:4040/getAskedQuestions/`+askedid);
  }


  // for facutly to see questions list 
  public getQuestionListFacultySubject(subject:any){
     return this.http.get(`http://localhost:4040/getQuestionListBySubject/`+subject)
  }

  public getAllAnswerList(){
    return this.http.get(`http://localhost:4040/getAllAnswerList`);
  }

  public getAllQuestionList(){
    return this.http.get(`http://localhost:4040/getAllQuestionList`);
  }

 // storing faculty answers
  public storeAnswer(questionAnswer:any){
    return this.http.post(`http://localhost:4040/storeAnswer`,questionAnswer)
  }

  // for getting Faculty answered questions
  public getAnsweredQuestions(answeredId:any){
    //answeredId=777;
    return this.http.get(`http://localhost:4040/getAnsweredQuestions/`+answeredId);
  }
     
  public deleteAnswerById(id:any){
    return this.http.get(`http://localhost:4040/deleteAnswer/`+id);
  }

  public deleteQuestionById(id:any){
    return this.http.get(`http://localhost:4040/deleteQuestion/`+id);
  }
}
