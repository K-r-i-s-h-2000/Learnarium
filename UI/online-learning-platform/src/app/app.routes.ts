import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TocourseComponent } from './tocourse/tocourse.component';
import { ListcategoriesComponent } from './listcategories/listcategories.component';
import { ListcoursesComponent } from './listcourses/listcourses.component';
import { PaymentComponent } from './payment/payment.component';
import { TocoursePaidComponent } from './tocourse-paid/tocourse-paid.component';
import { EnrolledCoursesComponent } from './enrolled-courses/enrolled-courses.component';
import { InstructorComponent } from './instructor/instructor.component';
import { MyRevenueComponent } from './my-revenue/my-revenue.component';
import { instructorAuthGuardGuard } from './instructor-auth-guard.guard';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
    {path:"Home",component:HomeComponent},
    {path:"Course",component:CourseComponent},
    {path:"",component:HomeComponent},
    {path:"AboutUs",component:AboutusComponent},
    {path:"Login",component:LoginComponent},
    {path:"Signup",component:SignupComponent},
    {path:"LandingPage",component:LandingPageComponent,canActivate:[AuthGuard]},
    {path:"ToCourse/:id",component:TocourseComponent},
    {path:"Listcategories",component:ListcategoriesComponent},
    {path:"ListCourses/:id",component:ListcoursesComponent},
    {path:"Payment",component:PaymentComponent,canActivate:[AuthGuard]},
    {path:"ToCoursePaid/:id",component:TocoursePaidComponent},
    {path:"EnrolledCourses",component:EnrolledCoursesComponent,canActivate:[AuthGuard]},
    {path:"Instructor",component:InstructorComponent,canActivate:[instructorAuthGuardGuard]},
    {path:"MyRevenue",component:MyRevenueComponent,canActivate:[instructorAuthGuardGuard]}
];
