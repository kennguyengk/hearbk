import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.css']
})
export class ContributorComponent implements OnInit {

  registerstatus = 'false';
	//creating a formgroup for email registration
	earlyaccess = new FormGroup ({
    	email: new FormControl()
  	});
  	selectpage = 'contributor';
  	emailerror = 'false';

	constructor( private userService: UserService, private fb: FormBuilder) { }

	//creating our form on init
	ngOnInit() {
		this.createForm();
	}

	
	ngAfterViewInit() {
	}

	createForm() {
		this.earlyaccess = this.fb.group({
      		email: ['', Validators.email]
    	});
	}

	//register email here
	register(data) {
		data.usertype = this.selectpage;
		// this.userService.save_usermail(data).subscribe(
		// 	(response) => {
		// 		if (response.status === "true") {
		// 			this.registerstatus = "true";
		// 		}
		// 		else{
		// 			// this.flashMessage.danger('Thank you for subscribing. Your email id is already registered with us. We will get back to you soon!',{delay: 5000});
		// 			//this will reset the form
		// 			this.flashMessage.warning(response.msg,{delay: 5000});
		// 			this.createForm();
		// 		}
		// 	});
	}

}
