import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SignupservicesService } from '../signupservices.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[SignupservicesService]
})
export class SignupComponent {
  onmain(){
    this.route.navigate(['/']);
      }
    data={
    name:"",
    email:"",
    password:"",
    phone:"",
    branch:"",
    date_of_birth:"",
    resident:"",
    IFSC_CODE:""
  }
  loading=false;
  errormessage="";
  submit=false;
  constructor(private register:SignupservicesService,private snack:MatSnackBar,private route:Router,private http:HttpClient){}

onsubmit(){
  this.loading=true;
  this.register.signuppage(this.data.name,this.data.email,this.data.password,this.data.phone,this.data.branch,this.data.date_of_birth,this.data.resident,this.data.IFSC_CODE).subscribe(
    {
      // next:data=>{
      //  console.log("registration successful")
      // },
      error:data=>{
        if(data.error.error.message="INVALID_EMAIL"){
this.errormessage="Invalid email"
        }else if(data.error.error.message=="EMAIL_EXISTS") {
          this.errormessage="Email already exists"
        }else{
          this.errormessage="Unknow error occured while registration"
        }




      }
    }
  ).add(()=>{
    this.loading=false;
    console.log('Registration Successfull ');
    this.snack.open("Registration Successful","ok");
    this.route.navigate(['login']);
  })
}

}
