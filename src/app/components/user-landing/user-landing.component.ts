import { Component, OnInit } from '@angular/core';
import { jwtResponse } from 'src/app/models/jwt-response';
import { stringResponse } from 'src/app/models/string-reponse';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Papa } from 'ngx-papaparse';
import { Batch } from 'src/app/models/Batch';
import { TokenService } from 'src/app/services/token.service';
import { Sample } from 'src/app/models/Sample';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Site } from 'src/app/models/Site';
import { DataService } from 'src/app/services/data.service.service';
import { User } from 'src/app/models/User';

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
  roles: string[] = [];
  res!:stringResponse;
  isUpgraded = false;
  isUpgradeFailed = false;
  private selectedFile!: File;
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

  constructor(
    private userService:UserService,
    private authService:AuthService,
    private tokenService:TokenService,
    private dataService:DataService,
    private papa:Papa
    ) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    //this.samples = new Array();
    //this.completedSamples = new Array();
    this.pending = 0;
    this.userService.getUserBoard().subscribe(
      (data : stringResponse) => {
        this.content = data;
      },
      err => {
        this.content = {message: err.error.message};
      }
    );
    this.userService.getUser(this.currentUser.id).subscribe(
      (data:User) => {
        this.bigUser = data;
      },
      err => {
        this.content = {message: err.error.message};
      }
    )
  }

  sendCSV() {
    this.user = this.tokenService.getUser();
    this.dataService.upLoadCSV(this.currentUser.id, this.selectedFile).subscribe(
      (data:User) => {
        this.user = data;
        console.log(this.user);
      }
    )
  }

  /*
  sendSamples() {
    console.log(this.samples);
    this.sample = this.samples[0];
    console.log(this.sample);
    console.log(this.samples[0]);

    this.dataService.uploadSample(this.batch.batchID, this.samples.pop()).subscribe(
      (data: string[]) => {
        this.samples.pop();
        this.completedSamples = data;
        console.log(this.completedSamples);
        if (this.samples.length != 0) {
          this.sendSamples();
        }
      },
      err => {
        console.log("error sending samples");
      }
    )
  }
  */

  onFileSelect(event:any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile.name;
    this.fileSize = this.selectedFile.size;

  }

  uploadFile() {
    if (this.selectedFile) {
      this.sendCSV();
    } else {
      console.log("no file selected");
    }
  }

  downLoadFile(fileName:string) {
    this.dataService.downloadFile(fileName).subscribe(
      (data:any) => {
        
      }
    )
  }


  parseFile() {
    this.papa.parse(this.selectedFile, {
      complete: data => {
        //add 450k support

        for(let s = 1; s < data.data[0].length; s++) {
          this.pending++;
          this.samples.push(new Sample(data.data[0][s]));
          for (let c = 1; c < data.data.length; c++) {
            this.samples[s-1].sites.push(new Site(data.data[c][0], data.data[c][s]));
          }
        }
      }
    });
  }

  upGrade(): any {
    this.authService.upgrade(this.currentUser.username).subscribe(
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
