import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../navbar.service';
import {AuthService} from 'src/app/shared/auth.service';
import { UploadService } from 'src/app/shared/upload.service';
import { Upload } from 'src/app/shared/upload';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { User } from '../../user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedFiles: FileList;
  currentUpload: Upload;
  fullname:string;
  email: string;
  response: User;
  public providerId:string='null';

  constructor(private http: HttpClient, private nav:NavbarService, private authService:AuthService, private upSvc:UploadService) { }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
}

uploadSingle() {
  let file = this.selectedFiles.item(0)
  this.currentUpload = new Upload(file);
  this.upSvc.pushUpload(this.currentUpload)
}

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
      })
    };
    
    //this.http.get('https://dev.api.eclerk.in/api/user/load', httpOptions)
    this.http.get<HttpResponse<User>>('https://dev.api.eclerk.in/api/user/load', httpOptions)
      .subscribe(
        (val) => {
          this.response = val['data'];
          this.email = this.response.email;
          console.log('POST call successful value returned in body', val);
        },
        response => {
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        });
  }

  logOut(){
    this.authService.SignOut();
    console.log("successfully logged out");
  }

}
