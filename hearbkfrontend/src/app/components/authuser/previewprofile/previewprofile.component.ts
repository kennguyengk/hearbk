import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-previewprofile',
  templateUrl: './previewprofile.component.html',
  styleUrls: ['./previewprofile.component.css']
})
export class PreviewprofileComponent implements OnInit {
  imagepath = '';
  username = '';
  bio = '';
  profiledata = [];
  constructor( private userservice: UserService) { }

  ngOnInit() {
  	        setTimeout(() => { this.getprofile(); }, 1000);
  }

  getprofile() {
        const profiledata = this.userservice.getcurrentUserProfile();
      this.imagepath = profiledata.image_path;
      this.username = profiledata.fullname;
      this.bio = profiledata.bio;
    }

}
