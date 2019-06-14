import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService, user } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser: string;
  loginForm;
  users: user[];

  constructor(private LoginService: LoginService,
    private formBuilder: FormBuilder, ) {

    this.LoginService.getUsers().subscribe(users => { this.users = users; });
    this.loginForm = this.formBuilder.group({ username: '', password: '' });
  }


  ngOnInit() {

  }

  onSubmit(loginData) {

    this.loginUser = loginData.username;
    /*
        for ( var i=0; ++i; i<this.users.length){
          var u: user = <user> this.users[i];
          if(u.loginEmail == loginData.username){
            this.loginUser = u.loginEmail;
          }
    
        }
    */

    let loginSuccess = false;
    this.users.forEach(u => {
      if (u.loginEmail === loginData.username && u.loginPwd === loginData.password) {
        loginSuccess = true;
      }
    });

    if (loginSuccess) {
      window.alert('Login succeeded.');
    } else {
      window.alert('Login failed.');
    }

    //console.warn('Order data: ',customerData);

    this.loginForm.reset();
  }
}
