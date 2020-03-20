import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  url:string="http://127.0.0.1:8000/api";
  urlLogin:string="/login/"

  stateChanged: EventEmitter<boolean> = new EventEmitter();
  authenticated:boolean=true;

  public login(username:string,password:string)
  {
    var formData: any = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    return this.http.post(this.url+this.urlLogin,formData);
  }

  public setAuthenticated(value:boolean)
  {
    this.authenticated=value;
    this.stateChanged.emit(this.authenticated);
  }
  
  getAuthenticated()
  {
    return this.authenticated;
  }

  logout()
  {
    this.authenticated=false;
    this.stateChanged.emit(this.authenticated);
  }

  stateChangedEmitter() {
    return this.stateChanged;
  }

}
