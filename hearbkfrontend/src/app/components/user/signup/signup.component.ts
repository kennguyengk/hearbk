import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { ActivatedRoute, Params, Router } from '@angular/router';

// imported module below is for social signups, can implement google login here anytime.
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular5-social-login';
import { InvisibleReCaptchaComponent } from 'ngx-captcha';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    fbloader = false;
    captchastatus = false;
    imageName = '';
    passwrdMsg = true;
    accountcreated = false;

    selectedFile: any = ' ';
    private base64textString: String = '';
    public files = '';

    constructor(private socialAuthService: AuthService,
        private route: ActivatedRoute, private fb: FormBuilder, private router: Router,
        private userService: UserService) {
    }

    @ViewChild('captchaElem') captchaElem: InvisibleReCaptchaComponent;


    signupForm = new FormGroup({
        first_name: new FormControl(),
        last_name: new FormControl(),
        username: new FormControl(),
        password: new FormControl(),
        cpassword: new FormControl(),
        image: new FormControl(),
    });

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.signupForm = this.fb.group({
            first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
            last_name: ['', [Validators.required, Validators.minLength(2)]],
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            cpassword: ['', [Validators.required, Validators.minLength(8)]],
            image: ['']
        });
    }

    // matching password and confirm password here
    checkpass(pass1: any, pass2: any) {
        if (pass1.length <= pass2.length) {
            if (pass1 === pass2) {
                // console.log("match")
                this.passwrdMsg = true;
            } else {
                // console.log("not match");
                this.passwrdMsg = false;

            }
        }
    }


    // invisible captcha starts here.
    handleLoad() {
        setTimeout(() => { this.captchaElem.execute(); }, 4000);
    }

    // for calling captcha manually
    // execute(): void{
    //     this.captchaElem.execute();
    // }

    // form is only submitted if we get captchaResponse
    handleSuccess(captchaResponse: string) {
        if (captchaResponse) {
            this.captchastatus = true;
        }
    }

    // email signup process lies here. and users service is used here to interact with server
    signup(userdata) {
        if (this.captchastatus === true) {
            console.log('captcha true');
            if (this.signupForm.valid) {
                if (this.signupForm.controls.password.value === this.signupForm.controls.cpassword.value) {
                    userdata.value.cpassword = null;
                    userdata.value.image = this.base64textString;
                    if (!this.selectedFile.name) {
                        userdata.value.file = ' ';
                    } else {
                        userdata.value.file = this.selectedFile.name;
                    }
                    this.signuptrue(userdata);
                } else {
                }
            } else {
            }
        } else {
            this.captchaElem.execute();
        }
    }

    // for completing signup
    signuptrue(userdata) {
        // console.log+this.route.snapshot.paramMap.get('type'));
        userdata.value.role = this.route.snapshot.paramMap.get('type');
        // console.log(userdata);
        this.userService.signup(userdata.value).subscribe(
            (response) => {
                console.log(response);
                if (response.status === 'true') {
                    this.accountcreated = true;
                    // this.router.navigate(['/login']);
                } else {
                }
            }
        );
        this.createForm();
    }


    // uploading image starts here
    onFileChanged(event: any) {
        // console.log(event.target.files[0]);
        // image data from event is fetched and passed to selectedFile variable
        this.selectedFile = event.target.files[0];
        // console.log(this.selectedFile);
        // console.log(event.target.files[0].name);
        this.imageName = event.target.files[0].name;
        this.selectedImage();
    }

    selectedImage() {
        const reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.selectedFile);
    }

    // our image is converted to binary code here and binary code is holded by base64textstring
    _handleReaderLoaded(readerEvt) {
        const binaryString = readerEvt.target.result;
        this.base64textString = btoa(binaryString);
        // console.log(this.base64textString);
    }

    // drag and drop files
    fileOver(event) {
    }

    fileLeave(event) {
    }

    dropped(event) {
        this.files = event.files;
        for (const droppedFile of event.files) {
            if (droppedFile.fileEntry.isFile) {
                this.imageName = droppedFile.fileEntry.name;
                const fileEntry = droppedFile.fileEntry;
                fileEntry.file((file: File) => {
                    this.selectedFile = file;
                    this.selectedImage();
                    // console.log(droppedFile.fileEntry);
                    // for multiple file uploads below
                    // const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                    // console.log(droppedFile.fileEntry.name);
                    //     // console.log(file.name);
                    //     // access thefile
                    //     // console.log(this.selectedFile.name);
                    //     // console.log(this.imageName);
                });
            }
        }
    }

    // removing image
    removeimage() {
        this.selectedFile = '';
        this.base64textString = '';
        this.imageName = '';
    }

    // facebook login
    public socialSignIn(socialPlatform: string) {
        this.fbloader = true;
        let socialPlatformProvider;
        if (socialPlatform === 'facebook') {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        } else if (socialPlatform === 'google') {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }

        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                userData.provider = this.route.snapshot.paramMap.get('type');
                // Now sign-in with userData
                this.userService.socialsignup(JSON.stringify(userData)).subscribe(
                    (response) => {
                        this.fbloader = false;
                        // console.log(response);
                        if (response.status === 'true') {
                            const loginStatus: any = {};
                            loginStatus.status = response.status;
                            loginStatus.uid = response.Userdetail.user_id;
                            sessionStorage.setItem('userStatus', JSON.stringify(loginStatus));
                            this.router.navigate(['/users/dashboard']);
                            console.log(loginStatus);
                        } else {
                        }

                    }
                );
            }
        );
    }








}
