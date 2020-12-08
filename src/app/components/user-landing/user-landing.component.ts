import { Component, OnInit } from '@angular/core';
import { jwtResponse } from 'src/app/models/jwt-response';
import { stringResponse } from 'src/app/models/string-reponse';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css']
})
export class UserLandingComponent implements OnInit {
  content!:stringResponse;
  form: any = {
    username: null,
    password: null
  };
  errorMessage = '';
  roles: String[] = [];
  res!:stringResponse;
  isUpgraded = false;
  isUpgradeFailed = false;

  constructor(private userService:UserService, private authService:AuthService) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      (data : stringResponse) => {
        this.content = data;
      },
      err => {
        this.content = {message: err.error.message};
      }
    );
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.upgrade(username, password).subscribe(
      (data: stringResponse) => {
        this.res = data;
        this.isUpgraded = true;
        this.isUpgradeFailed = false;
        this.reloadPage();
      },
      err => {
        this.isUpgraded = false;
        this.isUpgradeFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
