import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { UserService } from './components/shared/services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'app';
    shownavbar = true;
    showfooter = true;
    showTrue = false;

    constructor(private router: Router, private userservice: UserService) {
     /*    alert('1'); */

        // this.userservice.getProfileIfRefresh().subscribe(res=>console.log(res));
        router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                const url = event.url;
                const newUrl = event.url.split('/');
                if(newUrl[1] && (newUrl[1] === 'subscribe-lover' || newUrl[1] === 'subscribe-creator')) {
                    this.shownavbar = false;
                    this.showfooter = false;
                }
                if (url === "/foundersclub" || url === "/subscribe-lover" || url === "/subscribe-creator" || url === "/launch") {
                    this.shownavbar = false;
                    this.showfooter = false;
                }
                if (url === 'listener' || url === '/signup/listener' || url === '/forgetpassword'
                    || url === '/login' || url === '/user/signup/contributor' || url === '/signup/contributor'
                    || url === '/landing/contributor' || url === '/landing/listener' || url === '/'
                    || url === '/contributor' || url === '/user/login') {
                    this.shownavbar = false;
                }

                if (url === '/landing/listener' || url === '/landing/contributor' || url === '/'
                    || url === '/signup/listener' || url === '/forgetpassword' || url === '/login'
                    || url === '/user/login' || url === '/user/signup/contributor' || url === '/signup/contributor') {
                    this.showfooter = false;
                }
            }
        });
    }
    showHide() {
        this.showTrue = !this.showTrue;
    }
}
