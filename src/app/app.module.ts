import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { FacultyCreationComponent } from './components/faculty-creation/faculty-creation.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NormalUserDashboardComponent } from './components/normal-user-dashboard/normal-user-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentRegistrationComponent } from './components/student-registration/student-registration.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileUpdateComponent } from './components/file-update/file-update.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { AdminCreationComponent } from './components/admin-creation/admin-creation.component';
import { HeaderNavBarComponent } from './components/header-nav-bar/header-nav-bar.component';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminServiceService } from './services/Admin-Service/admin-service.service';
import { StudentServiceService } from './services/Student-Service/student-service.service';
import { FileServiceService } from './services/File-Service/file-service.service';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { StudentGuardGuard } from './guards/student-guard.guard';
import { FacultyGuardGuard } from './guards/faculty-guard.guard';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import { ArmChartsRecordComponent } from './components/arm-charts-record/arm-charts-record.component';
import { QuestionAnswerComponent } from './components/question-answer/question-answer.component';
import { QuestionAnswerServiceService } from './services/QA/question-answer-service.service';
import { ConfirmEqualValidatorDirective } from './Custom-Validators/confirm-equal-validator.directive';
import { AuthInterceptor } from './components/auth.interceptor';

import {MatListModule} from '@angular/material/list';
import { FacultyDashboardComponent } from './components/faculty-dashboard/faculty-dashboard.component';
 

import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { fetchSubjects } from './services/Fetch-Subjects/fetchSubjects.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminCreationComponent,
    AdminDashboardComponent,
    FacultyCreationComponent,
    HomeComponent,
    LoginComponent,
    //NormalUserDashboardComponent,
    ProfileComponent,
    StudentDashboardComponent,
    StudentRegistrationComponent,
    FileUploadComponent,
    FileUpdateComponent,
    ProfileUpdateComponent,
    HeaderNavBarComponent,
    SideNavBarComponent,

    ArmChartsRecordComponent,
    QuestionAnswerComponent, 
    ConfirmEqualValidatorDirective, 
    FacultyDashboardComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
MatPaginatorModule,
MatSortModule,
MatSnackBarModule,
MatInputModule,
MatSelectModule,
MatToolbarModule,
MatIconModule, 

MatListModule,

OrderModule,
FilterPipeModule,
NgxPaginationModule,
  ],
  
  providers: [             {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true},
              AdminServiceService ,
              StudentServiceService,
              FileServiceService ,
              AdminGuardGuard,
              QuestionAnswerServiceService,
              fetchSubjects,
              StudentGuardGuard,
              FacultyGuardGuard],

  bootstrap: [AppComponent]
})
export class AppModule { }
