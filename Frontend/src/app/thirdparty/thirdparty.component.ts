import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-thirdparty',
  templateUrl: './thirdparty.component.html',
  styleUrls: ['./thirdparty.component.css']
})
export class ThirdpartyComponent {
constructor(private route:Router){}
add(){
  this.route.navigate(["add"])
}
update(){
  this.route.navigate(["update"])
}

transfer(){
  this.route.navigate(["tpttransfer"])
}
}
