import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { UserService } from '../shared/services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usertype = 'contributor';
  joinas = 'listener';
  navigate_as = 'home/listenerhome';
  loggedin = false;

  constructor(private router: Router, private usersService: UserService, ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        const url = event.url;
        console.log(url);
        if (url === '/home/contributorhome') {
          this.usertype = 'contributor';
          this.joinas = 'listener';
          // this.navigate_as = "home/contributorhome" ;
          this.navigate_as = 'home/listenerhome';
        }
        if (url == '/home/listenerhome') {
          this.usertype = 'listener';
          this.joinas = 'Contributor';
          this.navigate_as = 'home/contributorhome';
        }
        // console.log(url);

      }
    });
  }


  ngOnInit() {
    const loggedInStatus: any = JSON.parse(localStorage.getItem('userStatus')) || JSON.parse(sessionStorage.getItem('userStatus'));
    // console.log(loggedInStatus.status);
    if (loggedInStatus) {
      if (loggedInStatus.status === 'true') {
        // console.log("status true");
        this.loggedin = true;
      }
    }
  }

  logout(): void {
    this.usersService.logout().subscribe(
      (response) => { console.log(response); }
    );
  }

}
