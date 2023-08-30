import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SignupservicesService {
  private baseUrl:string="http://localhost:8000"

  constructor(private http:HttpClient) { }
  signuppage(name:string,
    email:string,
    password:string,
    phone:string,
    branch:string,
    date_of_birth:string,
    resident:string,
    IFSC_CODE:string
    ){
    return this.http.post("http://localhost:8000/new",{name,email,password,phone,branch,date_of_birth,resident,IFSC_CODE});
  }
  storetoken(token:string){
    sessionStorage.setItem('token',token)
  }
thirdparty(account_no:number,name :String,
  Bank_name:String,
  branch:String,
  IFSC_CODE:String,
  adder_id:number,
  ){return this.http.post("http://localhost:5200/thirdparty",{account_no,name,Bank_name,branch,IFSC_CODE,adder_id});
}
}
