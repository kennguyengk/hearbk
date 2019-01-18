import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  constructor(private usersService: UserService,
  				private fb: FormBuilder,
  				private router: Router,
  				) { }

  forget_password = new FormGroup ({
	        email: new FormControl(),
	    });


	  ngOnInit() {
	  	this.createForm();
	  }


	  createForm() {
    this.forget_password = this.fb.group({
        email: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
        });
    }

    resetpassword(email) {
    	this.usersService.resetpassword(email).subscribe(
            (response) => {
    	console.log(response);
            	if (response.status == 'true') {
            		setTimeout(() => { this.router.navigate(['/login']); }, 5000);
            	} else {
            	}

            	// console.log(response);
            }
        );
    }

}
