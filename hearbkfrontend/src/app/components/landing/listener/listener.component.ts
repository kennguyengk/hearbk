import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { UserService } from '../../shared/services/user.service';


@Component({
  selector: 'app-listener',
  templateUrl: './listener.component.html',
  styleUrls: ['./listener.component.css']
})
export class ListenerComponent implements OnInit {

 	registerstatus = 'false';
	//creating a formgroup for email registration
	earlyaccess = new FormGroup ({
    	email: new FormControl()
  	});
  	selectpage = 'listener';
  	emailerror = 'false';

	constructor( private userService: UserService, private fb: FormBuilder) { }

	//creating our form on init
	ngOnInit() {
		this.createForm();
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
		// 		console.log(response);
		// 		if (response.status === "true") {
		// 			this.registerstatus = "true";
		// 		}
		// 		else{
		// 			//this will reset the form
		// 			this.flashMessage.warning(response.msg,{delay: 5000});
		// 			this.createForm();
		// 		}
		// 	});
	}

}
