import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

 
import { Router } from '@angular/router';  
import Swal from 'sweetalert2'; 
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';
import { QuestionAnswerServiceService } from 'src/app/services/QA/question-answer-service.service';
import { SuccessErrorOpenService } from 'src/app/services/SuccErrorOpen/success-error-open.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from 'src/app/services/Admin-Service/admin-service.service';
 
 
@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.css']
})
export class QuestionAnswerComponent implements OnInit {

  roleBasedQA:any;
  activateQuestionField=false;
  activateAnswerField=false;

  studentAskedQue=false;
  facultyAnsQue=false;
 
 subjectArray=["Java","Python","C","C++",".DotNet","SQL","HTML","CSS"];

  studentQuestionList :any;

  showFacultyAnswer=false;
  questionListFaculty:any;
  facultyAnsweredQueList: any;

   facAnswer:string;

  anwIndexBlock:any;
 
   subjectList:any;
   
  user={
    id:'',
    username:'',
    name:'',
    mobileNo:'',
    email:'',
    status:'',
    role:'',
    age:'',
    subject:'',
  }
  

 question= { 
            subject:'',
            question:'',
            askedId:'',
    }
 

  answer ={
    "answer":'',
    "givenId":''
  }

  

  questionAnswer ={ 
    subject:'',
    question:'',
    askedId:'',
    answerList :[{
          "answer":'',
          "givenId":''
      },
     ]
}

  constructor(private _router: ActivatedRoute , private login: LoginServiceService,
             private qaService:QuestionAnswerServiceService ,  private sucErr: SuccessErrorOpenService,
             private router:Router,private snack:MatSnackBar ,private adminService:AdminServiceService ) { 
              this.facAnswer='' }

  ngOnInit(): void {
      this.getAllSubjects();

    this.activateQuestionField=false;
    this.activateAnswerField=false;
  
    this.studentAskedQue=false;
    this.facultyAnsQue=false;
    this.showFacultyAnswer=false;

     this.user=this.login.getUser();
       

      this.roleBasedQA=this._router.snapshot.params['qa'];
    
    console.log(this.roleBasedQA)
    if(this.roleBasedQA=='askQuestion')  this.activateQuestionField=true;
    else if(this.roleBasedQA=='askedQuestion') {
      this.studentAskedQue=true;
      this.getQuestionAnswerList(this.user.id);
    }


    else if(this.roleBasedQA=='answerQuestions'){
               this.activateAnswerField=true;
               this.getQuestionList(this.user.subject);
      }  
    else if(this.roleBasedQA=='answeredQuestion'){
        this.facultyAnsQue=true;
        this.getAnsweredQueList(this.user.id);
    }

    
    this.user=this.login.getUser();

    this.question.askedId= this.user.id;
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

  askform = new FormGroup({

    SUBJECT : new FormControl("" ,[
      Validators.required, 
      // Validators.minLength(2),                           
      // Validators.pattern("[a-zA-Z].*") 
    ]),

    QUESTION : new FormControl("", [
       Validators.required,
       Validators.minLength(2),
       Validators.maxLength(150),

    ])
  
  })

  get Subject(){
    return this.askform.get("SUBJECT") as FormControl;
   }

   get QUation(){
    return this.askform.get("QUESTION") as FormControl;
   }

   ansform = new FormGroup({
    ANSWER : new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(350),

   ])
   })
   
   get Answer(){
    return this.ansform.get("ANSWER") as FormControl;
   }



   // for student to submit questions
  questionSubmit(){
       this.qaService.storeQuestion(this.question).subscribe(
        (data:any)=>{
          //console.log(data);
           
   
          Swal.fire('Successfully done !!','Ur Question Will shortly Answered','success' ).then((e)=>{
           // this.router.navigateByUrl('toQuestionAnswer');
            // location.reload();
            this.question.askedId='';
            this.question.question='';
            this.question.subject='';
          });
   
        },
        (error)=>{
         console.log(error);
        // alert('someting went wrong');
          this.sucErr.snackErrorOpen();

        }
        );
  }

  answerSubmit(index:any){
    let question=  this.questionListFaculty[index];
    console.log(question);

    if(this.facAnswer=='' || this.facAnswer==null || this.facAnswer.length==5 || this.facAnswer.length==150){
      this.snack.open('Answer Required , Min char-5 , Max chars-150 only !!','',{
        duration:5000,
      }) 
    }

   else { 
    this.answer.answer=this.facAnswer;
    this.answer.givenId=this.user.id;
    console.log(this.answer);

    this.questionAnswer=question;
    console.log(this.questionAnswer);
//-----------------------------------------------------------------------------------------
   this.questionAnswer.answerList.push(this.answer);
   // console.log(this.questionAnswer);

    this.qaService.storeAnswer(this.questionAnswer).subscribe(
      (data:any)=>{
        Swal.fire('Successfully done !!','Ur Answered Sumbitted','success' ).then((e)=>{
          // this.router.navigateByUrl('toQuestionAnswer');
          // window.location.href="/toQuestionAnswer/answerQuestions"
          // this.answer.answer='';
          // this.answer.givenId='';
          this.facAnswer='';
        });
      },
      (error)=>{
         // alert('someting went wrong');
         console.log(error);
         this.sucErr.snackErrorOpen();
      }
    )
    }
   
  } 
  

  // for Faculty getting Question List to give Answer
  getQuestionList(subject:any){
     this.qaService.getQuestionListFacultySubject(subject).subscribe(
      (data:any)=>{
          this.questionListFaculty=data;
        //  console.log(data)
      },
      (error)=>{
          console.log(error);
      }
     )
  }

  // for student asked and answered
  getQuestionAnswerList(id:any){
    this.qaService.getQuestionAnswerList(id).subscribe(
     (data:any)=>{
       this.studentQuestionList=data;
        
      // console.log("student  "+data)
     }     ,
     (error)=>{
      console.log(error); 
     }
    )
}

showFacultyAnswerBlock(index:any){
  this.facAnswer='';
  this.anwIndexBlock=index;
  this.showFacultyAnswer=true;
}
//for faculty answered questions 
getAnsweredQueList(id:any){
      this.qaService.getAnsweredQuestions(id).subscribe(
        (data:any)=>{
          this.facultyAnsweredQueList = data;
        //  console.log(data);
        } ,
        (error)=>{
         console.log(error); 
        }

      )
}
 

}
