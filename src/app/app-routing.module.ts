import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCreationComponent } from './components/admin-creation/admin-creation.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ArmChartsRecordComponent } from './components/arm-charts-record/arm-charts-record.component';
import { FacultyCreationComponent } from './components/faculty-creation/faculty-creation.component';
import { FacultyDashboardComponent } from './components/faculty-dashboard/faculty-dashboard.component';
import { FileUpdateComponent } from './components/file-update/file-update.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NormalUserDashboardComponent } from './components/normal-user-dashboard/normal-user-dashboard.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { ProfileComponent } from './components/profile/profile.component';
import { QuestionAnswerComponent } from './components/question-answer/question-answer.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentRegistrationComponent } from './components/student-registration/student-registration.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { FacultyGuardGuard } from './guards/faculty-guard.guard';
import { StudentGuardGuard } from './guards/student-guard.guard';

const routes: Routes = [

  { path:'home' , component:HomeComponent , pathMatch:'full' },
  { path:'' ,  redirectTo:'home', pathMatch:'full' },
  { path:'home' , component:HomeComponent , pathMatch:'full' },
  { path:'login' , component:LoginComponent , pathMatch:'full' },


  { path:'adminDashboard' , component:AdminDashboardComponent , pathMatch:'full'  , canActivate:[AdminGuardGuard]},
  { path:'facultyCreation' , component:FacultyCreationComponent , pathMatch:'full' , canActivate:[AdminGuardGuard]},

  { path:'adminCreation' , component:AdminCreationComponent , pathMatch:'full' , canActivate:[AdminGuardGuard]},
  { path:'facultyCreation' , component:FacultyCreationComponent , pathMatch:'full' , canActivate:[AdminGuardGuard]},

  { path:'fileUploading' , component:FileUploadComponent , pathMatch:'full' , canActivate:[AdminGuardGuard ]},

  { path:'fileUploadingFaculty' , component:FileUploadComponent , pathMatch:'full' , canActivate:[FacultyGuardGuard ]},
  
  
  // { path:'normalUserDashboard' , component:NormalUserDashboardComponent , pathMatch:'full'  },

  { path:'facultyDashboard'  , component:FacultyDashboardComponent, pathMatch:'full' , canActivate:[FacultyGuardGuard ]},

  { path:'studentDashboard'  , component:StudentDashboardComponent, pathMatch:'full' , canActivate:[StudentGuardGuard ]},




  { path:'registerStudent', component:StudentRegistrationComponent, pathMatch:'full'},


   
  
  {     path:'adminDashboard/updateFile/:pvid' ,  component:FileUpdateComponent },

  {     path:'myProfile'        , component:ProfileComponent ,  pathMatch:'full'},

  {     path:'myProfile/updateProfile/:username' ,   component : ProfileUpdateComponent , pathMatch:'full'},

  {     path:'uploadRecords' , component: ArmChartsRecordComponent , pathMatch:'full'},

  {     path:'toQuestionAnswer/:qa' ,component:QuestionAnswerComponent , pathMatch:'full' ,canActivate:[FacultyGuardGuard ,StudentGuardGuard ]},

  {     path:'toQuestionAnswerStudent/:qa' ,component:QuestionAnswerComponent, pathMatch:'full' , canActivate:[FacultyGuardGuard ,StudentGuardGuard ]},
  
  {     path:'toQuestionAnswerFaculty/:qa' ,component:QuestionAnswerComponent, pathMatch:'full', canActivate:[FacultyGuardGuard ,StudentGuardGuard ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
