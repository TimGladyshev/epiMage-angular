import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/models/Global';
import { stringResponse } from 'src/app/models/string-reponse';
import { DataService } from 'src/app/services/data.service.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content!:stringResponse;
  private roles: string[] = [];
  isLoggedIn = false;
  showContriutorBoard = false;
  username?: string;
  global!:Global;


  constructor(private userService:UserService,
    private tokenService:TokenService,
    private dataService:DataService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken(); //truthy value check

    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;

      this.showContriutorBoard = this.roles.includes('ROLE_CONTRIBUTOR');

      this.username = user.username;
    }

    this.userService.getPublicContent().subscribe(
      (data:stringResponse) => {
        this.content = data;
      },
      err => {
        console.log(err.error);
        this.content = { message: err.error.message };
      }
    );

    this.dataService.getGlobals().subscribe(
      (data:Global) => {
        this.global = data;
      },
      err => {
        console.log(err.error);
      }
    )
  }

  logout(): void {
    this.tokenService.signOut();
    window.location.reload();
  }

}
