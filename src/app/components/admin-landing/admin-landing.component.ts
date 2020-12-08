import { Component, OnInit } from '@angular/core';
import { stringResponse } from 'src/app/models/string-reponse';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.css']
})
export class AdminLandingComponent implements OnInit {

  content!:stringResponse;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = {message : err.error.message};
        ;
      }
    );
  }

}
