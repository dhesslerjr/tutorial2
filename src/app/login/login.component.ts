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
  public isVoter: boolean;
  public isAdmin: boolean;
  public isAuthor: boolean;
  public isLoggedOn: boolean;

  constructor(private LoginService: LoginService,
    private formBuilder: FormBuilder, ) {
  
    this.LoginService.getUsers().subscribe(users => { this.users=users; });
    this.loginForm = this.formBuilder.group({ username: '', password: '' });
   }


  ngOnInit() {
    if(localStorage.getItem('username').length>1){
      this.isLoggedOn=true;
      if(localStorage.getItem('vo')==JSON.stringify(true)){
        this.isVoter=true;
      }
      else{
        this.isVoter=false;
      }
    }
    else{
      this.isLoggedOn=false;
    }
  }

  onSubmit(loginData){
    
    let loginSuccess = false;
    localStorage.setItem('username','n');
    localStorage.setItem('vo',JSON.stringify(false));
    localStorage.setItem('ad',JSON.stringify(false));
    localStorage.setItem('au',JSON.stringify(false));
    
    if(!loginData.do_logout){
      this.users.forEach(u => {
        if (u.loginEmail === loginData.username && u.loginPwd === loginData.password) {
          loginSuccess = true;
          localStorage.setItem('username',u.loginEmail);
          localStorage.setItem('vo',u.isVoterRole);
          localStorage.setItem('ad',u.isAdminRole);
          localStorage.setItem('au',u.isAuthorRole);
        }
      });
    }

    if(loginSuccess){
      window.alert('Login succeeded.');

    }
    else{
      window.alert('Login failed.');
    }
    
    //console.warn('Order data: ',customerData);
    
    this.loginForm.reset();
  }
}
