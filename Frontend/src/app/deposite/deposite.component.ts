import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginservicesService } from '../loginservices.service';

@Component({
  selector: 'app-deposite',
  templateUrl: './deposite.component.html',
  styleUrls: ['./deposite.component.css']
})
export class DepositeComponent {
  data:any;
  resuser:any;
  depositAmount: number = 0;
  constructor(private user:LoginservicesService,private router:Router,private http:HttpClient,private snack:MatSnackBar){}
  ondeposit(){
    this.user.summaryview().subscribe((response) => {
      this.data = response;
      console.log(response)});

    const user_id = this.user.deposit()
    console.log(user_id);
    this.http.put(`http://localhost:8000/users/${user_id}`,{'amount':this.depositAmount}).subscribe(data => {
      data=data
      console.log(this.data);
      this.snack.open("Deposited","ok");
      this.router.navigate(['summary'])
  });
}
}
