import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginservicesService } from '../loginservices.service'
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  data:any;
  constructor(private user:LoginservicesService,private router:Router){}
  ngOnInit():void{
    this.onsubmit();
  }
  onsubmit(){
  this.user.view().subscribe((response) => {
    this.data = response;
    console.log(response)});

}
}
