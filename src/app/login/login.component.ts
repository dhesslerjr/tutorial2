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
  currentUser: user;
  public isLoggedOn: boolean;
  
  constructor(private LoginService: LoginService,
    private formBuilder: FormBuilder, ) {
    this.currentUser = new user();
    this.LoginService.getUsers().subscribe(users => { this.users=users; });
    this.loginForm = this.formBuilder.group({ username: '', password: '' });
   }


  ngOnInit() {
    this.userFromLocalStorage();
  }

  userFromLocalStorage()
  {
    if(localStorage.getItem('username').length>1){
      this.isLoggedOn=true;
      this.currentUser.loginEmail=localStorage.getItem('username');
      if(localStorage.getItem('vo')==JSON.stringify(true)){
        this.currentUser.isVoterRole=true;
      }
      else{
        this.currentUser.isVoterRole=false;
      }
    }
    else{
      this.isLoggedOn=false;
    }
  }

  onSubmit(loginData){
    
    let loginSuccess = false;
    localStorage.setItem('username','-');
    localStorage.setItem('vo',JSON.stringify(false));
    localStorage.setItem('ad',JSON.stringify(false));
    localStorage.setItem('au',JSON.stringify(false));
    
    if(loginData.do_logout!="yes"){
      this.users.forEach(u => {
        if (u.loginEmail === loginData.username && u.loginPwd === loginData.password) {
          loginSuccess = true;
          localStorage.setItem('username',u.loginEmail);
          localStorage.setItem('vo',u.isVoterRole);
          localStorage.setItem('ad',u.isAdminRole);
          localStorage.setItem('au',u.isAuthorRole);
          this.currentUser = u;
          this.isLoggedOn=true; 
        }
      });
      if(loginSuccess){
        window.alert('Login succeeded.');
  
      }
      else{
        window.alert('Login failed.');
      }
    }
    else{
      this.isLoggedOn = false;
      localStorage.setItem('username','-');
      window.alert('Logged out.');
    }
 
    this.loginForm.reset();
  }
}
