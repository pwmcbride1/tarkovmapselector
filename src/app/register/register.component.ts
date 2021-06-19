import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errrorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  Username: any;
  Password: any;
  ConfirmPass: any;


  registerUser(event: any): void{
    const { username, password } = this.form;
    
    if(this.Password != this.ConfirmPass){
      alert("Passwords do not match!");
      return;
    }

    this.authService.register(this.Username, this.Password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        alert("You have successfully registered! Please Login again");
        this.router.navigate(['/login']);
      },
      err => {
        this.errrorMessage = err.error.message;
        this.isSignUpFailed = true;
        alert(this.errrorMessage);
      }
    );
    
  }

}

