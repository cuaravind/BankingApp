import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginservicesService } from '../loginservices.service'
@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent {
  data:any;
  resuser:any;


  constructor(private user:LoginservicesService,private router:Router){}
  ondetails(){
    // this.user.view().subscribe((response) => {
    //   // Handle the response from the API here
    //   this.data = response;
    //   console.log(response)
      this.router.navigate(['details'])


}
ondeposit(){
  this.router.navigate(['deposite'])
  }
  onsummary(){
    this.router.navigate(['summary'])
  }
  ontransaction(){
    this.router.navigate(['transaction'])
  }
  transaction(){
    this.router.navigate(['viewtransaction'])
  }
  thirdparty(){
    this.router.navigate(['thirdparty'])
  }
  pdfview(){
    this.router.navigate(['pdfgenarate'])
  }
}
