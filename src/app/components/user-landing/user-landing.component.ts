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
import { UpLoad } from 'src/app/models/Upload';
import { Observable } from 'rxjs';


declare var require: any
const FileSaver = require('file-saver');

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
  uploads!:UpLoad[];

  constructor(
    private userService:UserService,
    private authService:AuthService,
    private tokenService:TokenService,
    private dataService:DataService,
    private papa:Papa,
    ) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
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

  sendCSV() {
    this.user = this.tokenService.getUser();
    this.dataService.upLoadCSV(this.currentUser.id, this.selectedFile).subscribe(
      (data:User) => {
        this.user = data;
        console.log(this.user);
      }
    )
  }

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
      (response:any) => {
        let blob:any = new Blob([response], { type: 'text/csv; charset=utf-8' });
			  const url = window.URL.createObjectURL(blob);
        FileSaver.saveAs(blob, `${fileName}`);
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
      },
      err => {
        this.isUpgraded = false;
        this.isUpgradeFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  delete(uploadId:string) {
    this.dataService.deleteUpload(this.bigUser.id, uploadId).subscribe(
      (data:User) => {
        this.bigUser = data;
        this.uploads = data.uploads;
        this.tokenService.saveBigUser(data);
        //this.reloadPage();
      },
      err => {
        console.log("error deleting");
      }
    )
  }



  reloadPage(): void {
    window.location.reload();
  }

}
