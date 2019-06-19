import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService, user } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  users: user[];

  constructor(private LoginService: LoginService,
    private formBuilder: FormBuilder, ) {
    this.LoginService.getUsers().subscribe(users => { this.users=users; });
    this.loginForm = this.formBuilder.group({ username: '', password: '' });
   }


  ngOnInit() {
  }

  isLoggedOn(){
    return this.LoginService.isLoggedIn();
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
        alert('Login succeeded.');
      }
      else{
        alert('Login failed.');
      }
    }else{
      this.LoginService.logout();
      window.alert('Logged out.');
    }

    this.loginForm.reset();
  }
}
