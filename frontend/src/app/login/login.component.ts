import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import {AuthService} from '../auth.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl();
  password = new FormControl();
  loginError: boolean = false;
  warningText: string = "";

  constructor(private router:Router,private auth:AuthService) { }

  ngOnInit() {}

  onLoginClick() {
    if(this.auth.getAuthenticated())
    {
      this.auth.logout();
      this.router.navigate(['/']);
    }
    else
    {
    this.loginError = false;
    if (this.email.value != "" && this.password.value != "") {
      this.warningText = "";
      console.log(this.email.value)
      console.log(this.password.value);
      this.auth.login(this.email.value,this.password.value).subscribe(
        (response) => 
        {
            this.loginError=false;
            this.warningText="";
            this.auth.setAuthenticated(true);
            this.router.navigate(['/'])
        },
        (error) => 
        {
         this.loginError=true;
         this.warningText="Please check your credentials again";
        }
      )
    }
    else {
      this.warningText = "Please enter a valid Username and Password combination";
      this.loginError = true;
    }
  }
  }

}
