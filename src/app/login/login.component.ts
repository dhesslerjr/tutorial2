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
  users: user [];

  constructor(private LoginService: LoginService,
    private formBuilder: FormBuilder, ) {
  
    this.LoginService.getUsers().subscribe(users => {this.users=users;});
    this.loginForm = this.formBuilder.group({username: '', password: ''});
   }


  ngOnInit() {
    
  }

  onSubmit(loginData){
    
    this.loginUser = "";

    for ( let u of this.users){
      if(u.loginEmail == loginData.username){
        this.loginUser = u.loginEmail;
      }

    }


    //this.loginUser =  this.users.find(x => x.loginEmail == loginData.username).loginEmail;
    window.alert("onSubmit()");

    if(this.loginUser){
      window.alert('Login succeeded.');
    }
    else{
      window.alert('Login failed.');
    }
    
    //console.warn('Order data: ',customerData);
    
    this.loginForm.reset();
  }
}