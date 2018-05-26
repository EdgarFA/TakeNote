import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController   } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
    public loginService: LoginServiceProvider, public toastCtrl: ToastController) {
    this.loginForm = this.createLoginForm();
  }

  ionViewDidLoad() {
    if(window.localStorage['token']!=null)
    {
      //this.navCtrl.push(HomePage);
    }
  }

  private createLoginForm(){
    return this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }  

  mostrarToast() {
    let toast = this.toastCtrl.create({
      message: 'El usuario no existe',
      cssClass:'toastCustomCss',
      duration:3000,
      position: 'top'
    });
    toast.present();
  }

  loginUser()
  { 
      this.loginService.postLogin(this.loginForm.value.email,this.loginForm.value.password).subscribe(
        (data)=>{
        this.usuario=data;

        window.localStorage['email']=this.loginForm.value.email;
        window.localStorage['password']=this.loginForm.value.password;
        window.localStorage['token']= this.usuario.token;

        this.navCtrl.setRoot(HomePage);
      },
      (error)=>{
        window.localStorage.clear();
        this.mostrarToast();
        console.error(error);
      });
  }   

  registerUser(){
    this.navCtrl.setRoot(SignupPage);
  }
}
