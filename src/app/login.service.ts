import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,flatMap } from 'rxjs/operators'
import { Observable } from 'rxjs';


export class user {
  loginEmail; 
    loginPwd;
    accountStatus;
    isAdminTole;
    isAuthorTole;
    isVoterTole;
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  users: user[] = null;

  constructor(private http: HttpClient) { }

  init() {
    return this.http.get('/assets/users.json').pipe(map((users: any) => {
      this.users = users;
    }));
  }

  getUsers() {
    if (this.users == null) {
      return this.init().pipe(map(() => { return this.users }));
    }
    else {
      return Observable.create(o => o.next(this.users));
    }
  }
}
