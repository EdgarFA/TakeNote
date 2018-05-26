import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { LoginPage } from '../login/login'
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  registerForm: FormGroup;
  usuario: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,public loginService: LoginServiceProvider) {
    this.registerForm = this.createLoginForm();
  }

  ionViewDidLoad() {

  }

  private createLoginForm(){
    return this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
      password2: ['',[Validators.required,this.equalto('password')]],
      nombre: ['',Validators.required],
      apellidos: ['',Validators.required],
      nacimiento: ['',Validators.required]
    })
  }  

  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let input = control.value;
        let isValid = control.root.value[field_name] == input;
        if (!isValid)
        {
           return {'equalTo': {isValid}};
        }
           
        else{
          return null;
        }
          
    };
}

  registerUser(){
      this.loginService.postRegister(
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.nombre,
      this.registerForm.value.apellidos,
      this.registerForm.value.nacimiento
    ).subscribe(
      (data)=>{
      this.navCtrl.setRoot(LoginPage);
    },
    (error)=>{
      window.localStorage.clear();
      console.error(error);
    });
  }

}
