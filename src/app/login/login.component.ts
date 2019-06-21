import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService, user } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  email = '';
  password = '';
  users: user[];

  constructor(private LoginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.LoginService.getUsers().subscribe(users => { this.users=users; });
    this.loginForm = this.formBuilder.group({ username: '', password: '' });
   }


  ngOnInit() {
    
  }

  isLoggedOn(){
    //console.log(this.router.url);

    if(this.router.url === "/logout"){
      this.LoginService.logout();
      this.router.navigate(["/login"]);
    }
    return this.LoginService.isLoggedIn();
  }

  getLoginBtnTxt(){
    if(this.isLoggedOn()){
      return "Logout";
    } else {
      return "Login";
    }
  }

  loginBtnClick(){
    if(this.isLoggedOn()){
      this.LoginService.logout();
      //alert('Logged out.');
    }else{
      let loginSuccess = false;
      this.users.forEach(u => {
        if (u.loginEmail === this.email && u.loginPwd === this.password) {
          this.LoginService.login(u);
          loginSuccess = true;
        }
      });

      if(loginSuccess){
        //alert('Login succeeded.');
        this.router.navigate(['topics']);
      }
      else{
        alert('Login failed.');
      }
    }

    this.password = '';
    this.email = '';
  }

  onSubmit(loginData){
    if(loginData.do_logout!="yes"){
      let loginSuccess = false;
      this.users.forEach(u => {
        if (u.loginEmail === loginData.username && u.loginPwd === loginData.password) {
          this.LoginService.login(u);
          loginSuccess = true;
        }
      });

      if(loginSuccess){
        //alert('Login succeeded.');
      }
      else{
        //alert('Login failed.');
      }
    }else{
      this.LoginService.logout();
      //window.alert('Logged out.');
    }

    this.loginForm.reset();
  }
}
