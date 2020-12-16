import { Component, OnInit } from '@angular/core';
import { Batch } from 'src/app/models/Batch';
import { jwtResponse } from 'src/app/models/jwt-response';
import { Sample } from 'src/app/models/Sample';
import { Site } from 'src/app/models/Site';
import { stringResponse } from 'src/app/models/string-reponse';
import { UpLoad } from 'src/app/models/Upload';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.css']
})
export class ContributorComponent implements OnInit {

  content!:stringResponse;
  form: any = {
    username: null,
    password: null
  };
  errorMessage = '';
  roles: string[] = [];
  res!:stringResponse;
  isUpgraded = false;
  isUpgradeFailed = false;
  selectedFile!: File;
  fileName = '';
  fileSize = 0;
  parsedData:any;

  user!: User;
  currentUser!: jwtResponse;
  batch!:Batch;
  samples:Sample[] = [];
  sample!:Sample;
  site!:Site;
  completedSamples:string[] = [];
  pending!:number;
  bigUser!:User;
  uploads!:UpLoad[];

  constructor(private userService:UserService,
    private authService:AuthService,
    private tokenService:TokenService,
    private dataService:DataService) { }

  ngOnInit(): void {
    this.userService.getContributorBoard().subscribe(
      (data : stringResponse) => {
        this.content = data;
      },
      err => {
        this.content = {message: err.error.message};
      }
    );
    this.currentUser = this.tokenService.getUser();
    this.userService.getUser(this.currentUser.id).subscribe(
      (data:User) => {
        this.bigUser = data;
        this.uploads = this.bigUser.uploads;
        console.log(this.uploads);
        this.tokenService.saveBigUser(this.bigUser);
      },
      err => {
        this.content = {message: err.error.message};
      }
    )
  }

  getDate(ms:bigint) {
    return new Date(ms.toString()).toDateString();
  }

  onFileSelectA(event:any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      console.log(this.selectedFile.name);
    }else {
      console.log("file not found")
    }
  }

  annotate(up:UpLoad) {
    this.dataService.annotate(up.id, this.selectedFile).subscribe(
      (data:UpLoad)=> {
        console.log(data);
        this.userService.getUser(this.currentUser.id).subscribe(
          (data:User) => {
            this.bigUser = data;
            this.uploads = this.bigUser.uploads;
            console.log(this.uploads);
            this.tokenService.saveBigUser(this.bigUser);
          },
          err => {
            this.content = {message: err.error.message};
          }
        )
        this.reloadPage()
      }
    )
  }

  share(uploadId:string) {
    this.dataService.shareUpload(uploadId).subscribe(
      (data:User)=> {
        this.bigUser = data;
        this.reloadPage();
      }
    )
  }


  reloadPage(): void {
    window.location.reload();
  }
}
