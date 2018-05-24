import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {

  constructor(public http: HttpClient) {
   
  }

  postLogin(email: String, password: String): any {

   var data={
     "email":email,
     "password":password
   };
    var header = { "headers": {"Content-Type": "application/json"} };
      return this.http.post('http://localhost:7171/api/signin',data,header)
  }
}
