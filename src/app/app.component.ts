import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'final-front-end';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showContriutorBoard = false;
  username?: string;

  constructor(private tokenService:TokenService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken(); //truthy value check

    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showContriutorBoard = this.roles.includes('ROLE_CONTRIBUTOR');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenService.signOut();
    window.location.reload();
  }
}
