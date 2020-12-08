import { Component, OnInit } from '@angular/core';
import { jwtResponse } from 'src/app/models/jwt-response';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser!: jwtResponse;

  constructor(private token: TokenService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

}
