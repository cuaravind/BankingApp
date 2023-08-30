import { MatSnackBar } from '@angular/material/snack-bar';

import { Component } from '@angular/core';
import { LoginservicesService } from '../loginservices.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  data:any;
  userName: any;

  constructor(private log:LoginservicesService,private snack:MatSnackBar){
    this.log.userNameObservable.subscribe((name) => {
      this.userName = name;

  });
}
  ngOnInit(): void {

    this.data=this.log.name1()
    console.log(this.data)

  }

  checkcondition(){
    if(this.log.isLoggedIn()){
      return true
    }
    return false
  }
  logout(){
    this.logout()
    this.snack.open("Logout Successfully","ok")

  }

}
