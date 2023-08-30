import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginservicesService } from '../loginservices.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  data:any;
  depositAmount: number = 0;
  constructor(private user:LoginservicesService,private router:Router,private route:ActivatedRoute,private http:HttpClient){}
  ngOnInit():void{
    this.ondeposit();
  }
  ondeposit(){
    this.user.summaryview().subscribe((response) => {
      this.data = response;
      console.log(response)});

    const user_id = this.user.deposit()
    console.log(user_id);
    this.http.put(`http://localhost:8000/users/${user_id}`,{'amount':this.depositAmount}).subscribe(data => {
      data=data
      console.log(this.data)

  });
  }

}

