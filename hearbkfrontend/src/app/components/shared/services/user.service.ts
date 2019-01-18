import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import {Users} from '../../models/users';
import { baseurl } from '../constants';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Accept': 'application/json' })
    // headers: new HttpHeaders({ 'Content-Type':'Access-Control-Allow-Origin', 'Accept':'application/json'})
    // headers: new HttpHeaders({ 'Content-Type':'plain/text')

};

@Injectable()
export class UserService implements OnInit {
    userid: any = '';
    public currentUser = [];


    constructor(private http: HttpClient) {

        this.getuserid();
        if (!this.currentUser.length) {
            // console.log(this.userid);
            // console.log("currnt usr is empty");
            this.getProfileIfRefresh();
        }
    }

    ngOnInit() {
        // this.getProfileIfRefresh();
    }


    getuserid() {
        const loggedInStatus: any = JSON.parse(localStorage.getItem('userStatus') || sessionStorage.getItem('userStatus'));
        // console.log(loggedInStatus);
        if (loggedInStatus) {
            // console.log(loggedInStatus);
            this.userid = loggedInStatus.uid;

        }

    }
    getProfileIfRefresh() {
        this.http.get(baseurl + 'users/get_profile/' + this.userid)
            .subscribe((response: any) => {
                this.currentUser = response.Userdetail;
            });
    }


    getcurrentUserProfile(): any {
        return this.currentUser;
    }


    save_usermail(user): Observable<any> {
        return this.http.post<any>(baseurl + 'visitoremails/save_email', user, httpOptions);
    }

    signup(userdata): Observable<any> {
        return this.http.post<any>(baseurl + 'users/signup', userdata, httpOptions);
    }


    resendEmail(email): Observable<any> {
        return this.http.post<any>(baseurl + 'users/resend_mail/' + email.email, httpOptions);
    }

    socialsignup(userdata): Observable<any> {
        return this.http.post<any>(baseurl + 'users/social_signup', userdata, httpOptions)
            .pipe(
                tap(
                    data => { this.currentUser = data.Userdetail; }
                ));
    }

    login(credentials): Observable<any> {
        return this.http.post<any>(baseurl + 'users/login', credentials, httpOptions)
            .pipe(
                tap(
                    data => {
                        console.log(data);
                        this.currentUser = data.Userdetail;
                    }
                )
            );
    }

    resetpassword(email): Observable<any> {
        return this.http.post<any>(baseurl + 'users/forgetPwd', email, httpOptions);
    }

    logout(): Observable<any> {
        this.currentUser = [];
        localStorage.removeItem('userStatus');
        sessionStorage.removeItem('userStatus');
        return this.http.get<any>(baseurl + 'users/logout');
    }






    editprofile(profiledata): Observable<any> {
        console.log('editprofile');
        return this.http.post<any>(baseurl + 'users/edit_profile', profiledata, httpOptions);
    }

    uploadprofile(imageobject): Observable<any> {
        return this.http.post<any>(baseurl + 'users/update_profile_pic', imageobject, httpOptions);
    }

    fav_artist_list(): Observable<any> {
        // console.log(baseurl+'users/get_profile/1');
        return this.http.get<any>(baseurl + 'users/get_artist');
    }

    update_fav_artist(fav_artist_object): Observable<any> {
        return this.http.post<any>(baseurl + 'favoriteartists/add_fav_artist', fav_artist_object, httpOptions);
    }

    update_fav_genre(fav_genre_object): Observable<any> {
        return this.http.post<any>(baseurl + 'favoritegenres/add_fav_genres', fav_genre_object, httpOptions);
    }

    // getting user list for search
    userList(): Observable<any> {
        return this.http.get<any>(baseurl + 'users/get_all_users');
    }

    // getting countries
    getcountries(): Observable<any> {
        return this.http.get<any>(baseurl + 'countries/get_countries');
    }

    // get states
    getstates(c_id): Observable<any> {
        return this.http.get<any>(baseurl + 'countries/get_states/' + c_id);
    }

    // get cities

    getcity(s_id): Observable<any> {
        return this.http.get<any>(baseurl + 'countries/get_cities/' + s_id);
    }

    simpleSearch(tags): Observable<any> {
        return this.http.post<any>(baseurl + 'users/search', tags, httpOptions);
    }

    advancedsearch(data): Observable<any> {
        return this.http.post<any>(baseurl + 'users/advance_search', data, httpOptions);
    }

    // link accounts
    linkaccount(data): Observable<any> {
        return this.http.post<any>(baseurl + 'users/add_link', data, httpOptions);
    }

}
