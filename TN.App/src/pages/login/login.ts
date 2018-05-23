import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  usuario: any;
  errorLogin: boolean =false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,) {
    this.loginForm = this.createLoginForm();
  }

  ionViewDidLoad() {
    
  }

  private createLoginForm(){
    return this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }  

  loginUser()
  {    
    
  }   

}
