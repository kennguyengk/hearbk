import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { fadeInAnimation } from '../../../animations/index';
import { trigger, state, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  profiledata:any;
    constructor(private usersservice: UserService) {
     }

    ngOnInit() {
      //this.getprofile();
    }

  getprofile() {
      this.profiledata = this.usersservice.getcurrentUserProfile();
      // console.log(this.profiledata)
      if (this.profiledata.length === 0) {
          setTimeout(() => { this.getprofile(); }, 1000);
      }
  }

}
