import { Component, OnInit } from '@angular/core';
import { stringResponse } from 'src/app/models/string-reponse';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null
  }
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  res!:stringResponse;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe(
      (data: stringResponse) => {
        this.res = data;
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err: { error: { message: string; }; }) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
