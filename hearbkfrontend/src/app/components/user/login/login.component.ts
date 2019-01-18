import { Component, OnInit } from '@angular/core';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular5-social-login';
import { UserService } from '../../shared/services/user.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    fbloader = false;
    loginvalue = 'Log In';

    constructor(private usersService: UserService,
        private fb: FormBuilder,
        private socialAuthService: AuthService,
        private router: Router) {
        alert('sdsd');
    }

    loginForm = new FormGroup({
        username: new FormControl(),
        password: new FormControl(),
        rememberme: new FormControl(),
    });


    ngOnInit() {
        this.createForm();
    }


    createForm() {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
            password: ['', Validators.required],
            rememberme: ''
        });
    }

    login(credentials) {
        if (credentials.username === '' || credentials.password === '') {
        } else {
            this.loginvalue = 'Logging In';
            this.usersService.login(credentials).subscribe(
                response => {
                    this.loginvalue = 'Log In';
                    if (response.status === 'true') {
                        if (credentials.rememberme === true) {
                            const loginStatus: any = {};
                            loginStatus.status = response.status;
                            loginStatus.uid = response.Userdetail.user_id;
                            localStorage.setItem('userStatus', JSON.stringify(loginStatus));
                            this.router.navigate(['/users/dashboard']);
                        } else {
                            const loginStatus: any = {};
                            loginStatus.status = response.status;
                            loginStatus.uid = response.Userdetail.user_id;
                            // console.log(loginStatus);
                            sessionStorage.setItem('userStatus', JSON.stringify(loginStatus));
                            this.router.navigate(['/users/dashboard']);
                        }
                    } else {
                    }
                }
            );
        }
    }

    public socialSignIn(socialPlatform: string) {
        let socialPlatformProvider;
        if (socialPlatform === 'facebook') {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        } else if (socialPlatform === 'google') {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }

        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                // Now sign-in with userData
                this.fbloader = true;
                this.usersService.socialsignup(JSON.stringify(userData)).subscribe(
                    (response) => {
                        if (response.status === 'true') {
                            const loginStatus: any = {};
                            loginStatus.status = response.status;
                            loginStatus.uid = response.Userdetail.user_id;
                            sessionStorage.setItem('userStatus', JSON.stringify(loginStatus));
                            this.router.navigate(['/users/dashboard']);
                        } else {
                        }

                    }
                );
            }
        );
    }

}
