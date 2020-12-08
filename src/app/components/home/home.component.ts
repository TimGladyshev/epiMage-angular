import { Component, OnInit } from '@angular/core';
import { stringResponse } from 'src/app/models/string-reponse';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content!:stringResponse;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      (data:stringResponse) => {
        this.content = data;
      },
      err => {
        console.log(err.error);
        this.content = { message: err.error.message };
      }
    );
  }

}
