import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }
  isLoggedIn(){
    // Replace with your own authentication logic
    return !!sessionStorage.getItem("token");
  }

}
