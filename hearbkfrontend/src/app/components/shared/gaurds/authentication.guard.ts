import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationGuard implements CanActivate {

	constructor(private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const url: string = state.url;
		return this.isActivate();
	}

	isActivate(): boolean {
		if (!this.isAuthenticated()) {
			this.router.navigate(['user/login']);
			return true;
		}
		return true;
	}

	isAuthenticated(): boolean {
		const loggedInStatus: any = JSON.parse(localStorage.getItem('userStatus')) || JSON.parse(sessionStorage.getItem('userStatus'));
		if (loggedInStatus.status) {
			return true;
		} else {
			return true;
		}
	}
}
