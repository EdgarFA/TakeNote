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

  postRegister(email: String, password: String, nombre: String, apellidos:String, nacimiento: Date){
    var data={
      "email":email,
      "password":password,
      "nombre": nombre,
      "apellidos": apellidos,
      "nacimiento": nacimiento,
      "alta": Date.now,
      "acceso": Date.now
    };

    var header = { "headers": {"Content-Type": "application/json"} };
    return this.http.post('http://192.168.1.12:7171/api/signup',data,header)

  }

  postLogin(email: String, password: String) {

   var data={
     "email":email,
     "password":password
   };
    var header = { "headers": {"Content-Type": "application/json"} };
      return this.http.post('http://192.168.1.12:7171/api/signin',data,header)
  }
}
