import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginservicesService } from '../loginservices.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  data:any;
  depositAmount: number = 0;

  constructor(private user:LoginservicesService,private router:Router,private route:ActivatedRoute,private http:HttpClient){}
  ngOnInit():void{
    this.ondeposit();
  }

  ondeposit(){
    this.user.viewthirdparty().subscribe((response) => {
      this.data = response;
      console.log(response)});
  }
  delete(adder_id:number,account_no:number){
    return this.http.delete(`http://localhost:5200/thirdparty/delete/${adder_id}/${account_no}`).subscribe(res=>{
      console.log('res',res);

    })
  }
  onEdit(item:any){
    this.data.forEach((element:any)=> {
      element.isEdit = false;

    });
    item.isEdit = true;
}

update(adder_id: number,account_no:number) {
  const transactions = [...this.data];
  const update = transactions.filter(appointment => appointment.account_no === account_no)[0];
  if (update) {
    console.log(update);
    console.log(account_no);
    this.http.put(`http://localhost:5200/thirdparty/update/${adder_id}/${account_no}`, update).subscribe(res => {
      console.log('res', res);
    });
  }
}
}
