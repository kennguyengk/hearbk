import { Component, OnInit, ViewChild } from '@angular/core';
import { BetaService } from "./../../services/beta/beta.service";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LocalstorageService } from './../../services/localstorage/localstorage.service';
import { Router, ActivatedRoute } from '@angular/router'
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-signup-creator',
  templateUrl: './signup-creator.component.html',
  styleUrls: ['./signup-creator.component.css']
})
export class SignupCreatorComponent implements OnInit {
  firstName: string;
  lastName: string;
  twitter = '';
  instagram = '';
  message: string;
  msgShow = false;
  invalidNames: boolean;
  email: string;
  invalidLastname: boolean;
  invalidFirstname: boolean;

  mailChimpEndpoint = 'https://hearbk.us19.list-manage.com/subscribe/post-json?u=7c20252597ea6b19084289f60&amp;id=7cff440d91&';
  submitted = false;
  error = '';
  exsistMsg = '';
  exsistShow: boolean;

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;

  constructor(private betaServ: BetaService, private localServ: LocalstorageService, private router: Router,private http: HttpClient,
    private route: ActivatedRoute) {
      
    try {
      this.email = atob(this.route.snapshot.paramMap.get('email'));
    } catch (error) {
      router.navigate(['/']);
    }
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(this.email) == false) {
      router.navigate(['/']);
    }

    if(this.localServ.get('betaSubscriber')) {
      router.navigate(['home']);
    }
  }

  ngOnInit() {
  }

  signup() {
    if(!this.firstName || this.firstName.length < 0 || !this.lastName || this.lastName.length < 0) {
      this.invalidNames = true;
      return false;
    }
    let alphaReg = /^[a-zA-Z]*$/;
    this.invalidNames = false;
    if(!alphaReg.test(this.firstName)) {
      this.invalidFirstname = true;
      return false;
    }
    this.invalidFirstname = false;
    if(!alphaReg.test(this.lastName)) {
      this.invalidLastname = true;
      return false;
    }

    this.invalidLastname = false;
    let input = {
      "first_name": this.firstName,
      "last_name": this.lastName,
      "instagramAccount": this.instagram,
      "twitterAccount": this.twitter,
      "favouriteArtist": ''
    };

    let num = '1';
    const params = new HttpParams()
        .set('EMAIL', this.email)
        .set('FNAME', this.firstName)
        .set('LNAME', this.lastName)
        .set('MMERGE3', this.twitter)
        .set('MMERGE4', this.instagram)
				.set('group[179]', num)
        .set('b_7c20252597ea6b19084289f60_7cff440d91', '');
        
    const mailChimpUrl = this.mailChimpEndpoint + params.toString();

    this.http.jsonp<MailChimpResponse>(mailChimpUrl, 'c').subscribe(response => {
      if (response.result && response.result !== 'error') {
        this.submitted = true;
        this.autoShownModal.hide();
        this.showModal();
       // this.localServ.set('betaSubscriber',true);
      }else {
        this.exsistMsg = 'You are already subscribed with us.';
        this.exsistShow = true;
        this.error = response.msg;
        // this.localServ.set('betaSubscriber',true);
      }
    }, error => {
      this.exsistMsg = 'You are already subscribed with us.';
      this.exsistShow = true;
    });

    /* this.betaServ.creatorSignup(input).subscribe(
      res => {
        if (res.status === "true") {
          this.msgShow = true;
          this.message = res.msg;
          this.showModal();
          this.localServ.set('betaSubscriber',true);
        }
      },
      err => {
        console.log(err);
      }
    ) */
  }

  showModal(): void {
    this.autoShownModal.show();
  }

  hideModal(): void {
    this.autoShownModal.hide();
    document.getElementById("linkStripe").click();
  }
}

interface MailChimpResponse {
  result: string;
  msg: string;
}
