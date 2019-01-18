import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router'
import { BetaService } from './../../services/beta/beta.service';
import { LocalstorageService } from './../../services/localstorage/localstorage.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  @ViewChild('contactModel') contactModel: ModalDirective;
  @ViewChild('thankModal') thankModal: ModalDirective;
  email: string;
  role: string;
  invlidEmail: boolean;
  contactSubject: string;
  contactName: string;
  contactEmail: string;
  invlidContact: boolean;
  showAll: boolean;
  invlidEmailContact: boolean;

  mailChimpEndpoint = 'https://hearbk.us19.list-manage.com/subscribe/post-json?u=7c20252597ea6b19084289f60&amp;id=7cff440d91&';
  submitted = false;
  error = '';
  
  constructor(private beatServ: BetaService, private router: Router, private localServ: LocalstorageService) {
    if(this.localServ.get('betaSubscriber')) {
      router.navigate(['home']);
    } else {
      this.showAll = true;
    }
  }
  
  ngOnInit() {
  }

  showModal(role): void {
    this.autoShownModal.show();
    this.role = role;
  }

  hideModal(): void {
    this.contactModel.hide();
  }

  showModal2(): void {
    this.contactModel.show();
  }

  hideModal2(): void {
    this.contactModel.hide();
  }

  showThankModal(): void {
    this.thankModal.show();
  }

  hideThankModal(): void {
    this.thankModal.hide();
  }

  contactUs(){
    if(!this.contactEmail || this.contactEmail.length < 0 || !this.contactName || 
      this.contactName.length < 0 || !this.contactSubject || this.contactSubject.length < 0) {
        this.invlidContact = true;
        return false;
    }
    this.invlidContact = false;
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(this.contactEmail) == false) {
      this.invlidEmailContact = true;
      return false;
    }
    this.invlidEmailContact = false;
    let body = {
      "contactEmail":this.contactEmail,
      "message":this.contactSubject,
      "contactName":this.contactName
    }
    this.beatServ.contactUs(body).subscribe(
      res => {
        this.contactModel.hide();
        this.thankModal.show();
        this.contactEmail = '';
        this.contactSubject = '';
        this.contactName = '';
      },
      err => {
        console.log('errrorrrs', err);
      }
    )
  }

  roleChange(role) {
    this.role = role;
  }

  subscribeEmail() {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(this.email) == false) {
      this.invlidEmail = true;
      return false;
    }

    if(this.role === 'fan') {
      document.getElementById('submitButton').click();
      this.router.navigate(['subscribe-lover', btoa(this.email)]);
    } else {
      document.getElementById('submitButton').click();
      this.router.navigate(['subscribe-creator', btoa(this.email)]);
    } 
    /* let body = {
      "email": this.email,
      "role": this.role
    }
    this.beatServ.subscriberBeta(body).subscribe(
      res => {
        console.log(res);
        if(this.role === 'fan') {
          this.router.navigate(['subscribe-lover']);
        } else {
          this.router.navigate(['subscribe-creator']);
        }
      },
      err => {
        console.log('errrorrrs', err);
      }
    ) */
  }
}
