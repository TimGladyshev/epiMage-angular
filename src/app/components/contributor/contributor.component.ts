import { Component, OnInit } from '@angular/core';
import { stringResponse } from 'src/app/models/string-reponse';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.css']
})
export class ContributorComponent implements OnInit {

  content!:stringResponse;

  constructor(private userService:UserService) { }

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
}
