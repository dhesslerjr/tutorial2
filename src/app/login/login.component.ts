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

  onSubmit(loginData){
    
    let loginSuccess = false;
    localStorage.setItem('username','none');
    localStorage.setItem('vo','0');
    localStorage.setItem('ad','0');
    localStorage.setItem('au','0');
  
    this.users.forEach(u => {
      if (u.loginEmail === loginData.username && u.loginPwd === loginData.password) {
        loginSuccess = true;
        localStorage.setItem('username',u.loginEmail);
        localStorage.setItem('vo',u.isVoterRole);
        localStorage.setItem('ad',u.isAdminRole);
        localStorage.setItem('au',u.isAuthorRole);
      }
    });

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
