import { Component, OnInit } from '@angular/core';
import { Ng2ScrollableDirective } from 'ng2-scrollable';
import { scrollTo } from 'ng2-utils';
import { FormGroup, FormBuilder , FormControl } from '@angular/forms';
import { generes } from '../../shared/constants';
import { UserService } from '../../shared/services/user.service';
declare var $;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    loggedInUserId: any = '';
    profiledata: any = [];

    //user id of logged in user
    userid = '';
    loader = false;

    //loggedin user profile
    userobject: any = '';

    //profileimage
    selectedImagefile: any = ' ';

    imageobject: any = {};
    profilepic_url = 'assets/loading.gif';

    //for country selection dropdowns
    countries = [];
    states = [];
    cities = [];

    //dropdowns
    dropdownList = [];
    selectedartist = [];
    selectedgenres = [];
    dropdownSettings = {};
    artist = [];
    genres = [];
    selectedOptn;
    selectedOptnKey;
    urlLink;


    //account links
    linkedAccounts;
    fbstatus = 0;
    instastatus = 0;
    twitterstatus = 0;
    sCstatus = 0;
    ytstatus = 0;
    spostatus = 0;


    userListGroup = ['/assets/p1.jpg', '/assets/p2.jpg', '/assets/p3.jpg', '/assets/p4.jpg'];

    constructor(private fb: FormBuilder, private usersservice: UserService) {
        this.getprofile();
        this.getcountries();
        // setTimeout(()=>{ this.getprofile(); }, 1000);
    }

     //get user profile
    getprofile() {
        this.profiledata = this.usersservice.getcurrentUserProfile();
        if (this.profiledata.length === 0) {
            setTimeout(() => { this.getprofile(); }, 1000);
        }
        this.userobject = this.profiledata;
        this.selectedartist = this.profiledata.fav_artists;
        this.selectedgenres = this.profiledata.fav_genres;
        this.userid = this.userobject.user_id;
        if (this.userobject.country) {
            setTimeout(() => { this.onCountrySelected(this.userobject.country); }, 1000);

        }
        this.createForm();
    }


	id = 's1'; hid = 'h1'; wid = 'w1';
    scrollTo(selector, parentSelector, horizontal) {
        scrollTo(
            selector,       // scroll to this
            parentSelector, // scroll within (null if window scrolling)
            horizontal,     // is it horizontal scrolling
            0               // distance from top or left
        );
    }

   // LinkAccount(val){
   //    if(val === 'fb'){
   //       window.open("https://www.facebook.com", "_blank");
   //    }
   //    else if(val === 'ins'){
   //      window.open("https://www.instagram.com", "_blank");
   //    }
   //    else if(val === 'twt'){
   //      window.open("https://www.twitter.com", "_blank");
   //    }
   //    else if(val === 'sc'){
   //      window.open("https://www.soundcloud.com", "_blank");
   //    }
   //    else if(val === 'yt'){
   //      window.open("https://www.youtube.com", "_blank");
   //    }
   //    else if(val === 'sp'){
   //      window.open("https://www.spotify.com", "_blank");
   //    }
// }

    //build form
    profileform = new FormGroup ({
          fullname: new FormControl(),
          professional_name: new FormControl(),
          title: new FormControl(),
          company: new FormControl(),
          bio: new FormControl(),
          website: new FormControl(),
          gender: new FormControl(),
          dob: new FormControl(),
          state: new FormControl(),
          city: new FormControl(),
          country: new FormControl(),


      });



    ngOnInit() {
        // console.log(sessionStorage.getItem('id'));
        this.fav_artists();

        document.getElementById('focusmeplease').focus();

        //imported generes
        this.genres = generes;

        this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 4,
            allowSearchFilter: true
        };
         setTimeout(() => { this.link_account_status(); }, 2000);
    }


    link_account_status() {
      const accounts = this.profiledata.accounts;
        // let accunt:any = [{"fb":"www.skdjha.com"},{"twitter":"ttttt"}]
        // let linked_array = accunt;
        accounts.forEach(type => {

        if (type.fb) {
            this.fbstatus = 1;
        }
        if (type.instagram) {
            this.instastatus = 1;
        }
        if (type.twitter) {
            this.twitterstatus = 1;
        }
        if (type.scloud) {
            this.sCstatus = 1;
        }
        if (type.youtube) {
            this.ytstatus = 1;
        }
         if (type.spotify) {
            this.spostatus = 1;
        }

        });
        this.preview_linked_accounts();

    }

    preview_linked_accounts() {
       this.linkedAccounts = [
            {icon: 'assets/facebook.png', title: 'FACEBOOK', key: 'fb', status: this.fbstatus},
            {icon: 'assets/instagram.png', title: 'INSTAGRAG', key: 'instagram', status: this.instastatus},
            {icon: 'assets/twitter.png', title: 'TWITTER', key: 'twitter', status: this.twitterstatus},
            {icon: 'assets/Soundcloud.png', title: 'SOUNDCLOUD', key: 'scloud', status: this.sCstatus},
            {icon: 'assets/youtube.png', title: 'YOUTUBE', key: 'youtube', status: this.ytstatus},
            {icon: 'assets/Spotify.png', title: 'SPOTIFY', key: 'spotify', status: this.spostatus},
          ];
    }

    createForm() {
        this.profileform = this.fb.group({
            fullname: this.userobject.fullname,
            professional_name: this.userobject.professional_name,
            title: this.userobject.title,
            company: this.userobject.company,
            bio: this.userobject.bio,
            website: this.userobject.website,
            gender: this.userobject.gender,
            dob: this.userobject.dob,
            country: this.userobject.country,
            state: this.userobject.state,
            city: this.userobject.city,
            });

    }



	openNav() {
	    document.getElementById('mySidenav').style.width = '250px';
	    document.getElementById('main').style.marginLeft = '250px';
	}

	closeNav() {
	    document.getElementById('mySidenav').style.width = '0';
	    document.getElementById('main').style.marginLeft = '0';
	}





    //firstly uploading profile picture
    imageselected = false;
    uploadprofile() {
        this.loader = true;
        this.imageobject.user_id = this.userid;
        // console.log(JSON.stringify(this.imageobject));
         this.usersservice.uploadprofile(JSON.stringify(this.imageobject)).subscribe(response => {
             // this.userobject = response.Userdetail;
             this.profilepic_url = response.image_path;
             this.loader = false;
             this.imageselected = false;
             // console.log(response.image);
            });
    }

    onFileChanged(event) {

    	this.imageselected = true;
        this.selectedImagefile = event.target.files[0];
        this.imageobject.imagename = event.target.files[0].name;
        this.selectedImage();
    }

    selectedImage() {
        const reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.selectedImagefile);
      }

      _handleReaderLoaded(readerEvt) {
        const binaryString = readerEvt.target.result;
        this.imageobject.base64textString = btoa(binaryString);
        // console.log(this.base64textString);
    }

    //secondly updating profile on every input click


    //thirdly updating favartists and fav genres
    editprofile(profiledata) {
        profiledata.user_id = this.userid;

        // console.log(profiledata);
         this.usersservice.editprofile(profiledata).subscribe(response => {
             this.userobject = response.Userdetail;
             // console.log(response);
             this.popToast();
            });
    }

    //get  artists list---------------starts here----------------------------------------------------------
    fav_artists() {
        this.usersservice.fav_artist_list().subscribe(response => {
            this.artist = response.artist;
        });
    }


    fav_artist_object: any = {};
    update_fav_artist(data) {
        this.fav_artist_object.user_id = this.userid;
        this.fav_artist_object.artist = data;
        // console.log(this.fav_artist_object);
        this.usersservice.update_fav_artist(JSON.stringify(this.fav_artist_object)).subscribe(response => {
            // console.log(response);
        });
    }


    onItemSelect(item: any) {
        this.update_fav_artist(this.selectedartist);
    }

    onSelectAll(items: any) {
        // console.log(items);
        this.update_fav_artist(items);
    }

    OnItemDeSelect(item: any) {
        this.update_fav_artist(this.selectedartist);
    }

    onDeSelectAll(items: any) {
        this.update_fav_artist(items);
    }

    // ----------------------------------------------------mamnaging user favourites ends here-------


    //---------------------managing user fav generis ------------------------------------------------

    fav_genres_object: any = {};
    update_fav_genre(data) {
        this.fav_genres_object.user_id = this.userid;
        this.fav_genres_object.genres = data;
        // console.log(this.fav_genres_object);
        this.usersservice.update_fav_genre(JSON.stringify(this.fav_genres_object)).subscribe(response => {
            // console.log(response);
        });
    }

     ongenreSelect(item: any) {
        this.update_fav_genre(this.selectedgenres);
    }

    ongenreSelectAll(items: any) {
        // console.log(items);
        this.update_fav_genre(items);
    }

    OngenreDeSelect(item: any) {
        this.update_fav_genre(this.selectedgenres);
    }

    ongenreDeSelectAll(items: any) {
        this.update_fav_genre(items);
    }

    previewprofile(abc) {

    }
   // mamnaging user favourites generics ends here------------------------------------------------------------


    popToast() {
        const toast = {
            type: 'success',
            title: 'Saved',
            showCloseButton: false,
            //timeout: 30000
        };
    }

    //country state city dropdown starts here---------------------------------
    getcountries() {
        this.usersservice.getcountries().subscribe(response => {
            this.countries = response.countries;
            // console.log(this.countries);
        });
    }


    countryobject: any = [];
    //on country selection
        onCountrySelected(c_name) {
              this.countries.forEach(countryname => {
                   if (countryname.name === c_name) {
                      this.usersservice.getstates(countryname.id).subscribe(response => {
                          this.states = response.states;
                           this.onStateSelected(this.userobject.state);
                      });
                }
              });
      }

    onStateSelected(s_name) {
      // console.log(this.states);
              this.states.forEach(statename => {
                   if (statename.name === s_name) {
                     // console.log("statename");
                      this.usersservice.getcity(statename.id).subscribe(response => {
                          this.cities = response.cities;
                          // console.log(response);
                      });
                }
              });
      }

      //city selected
    onCitySelected(cityname) {
        // this.countryobject.city = cityname;
    }


    //for model linking social accounts-------------------------------------------------

     openlinkedAcount(title, key) {
       // console.log(title,key)
      $('#myModal').on('shown.bs.modal', function() {
         $('.modal-backdrop').css('display', 'none');
      });
      this.selectedOptn = title;
      this.selectedOptnKey = key;
      this.urlLink = null;
    }

    clear() {
      this.selectedOptn = null;
      this.selectedOptnKey = null;
      this.urlLink = null;
    }


    saveLink(link) {
        const accountlink: any = {};
        accountlink.link_type = this.selectedOptnKey;
        accountlink.link = link;
        accountlink.user_id = this.userid;
        this.usersservice.linkaccount(accountlink).subscribe( response => {
            if (response.status === 'true') {
                switch (this.selectedOptnKey) {
                    case 'fb':
                        this.fbstatus = 1;
                        break;
                    case 'instagram':
                        this.instastatus = 1;
                        break;
                    case 'twitter':
                        this.twitterstatus = 1;
                        break;
                     case 'scloud':
                        this.sCstatus = 1;
                        break;
                     case 'youtube':
                        this.ytstatus = 1;
                        break;
                     case 'spotify':
                        this.spostatus = 1;
                        break;
                }
            }
            this.preview_linked_accounts();
        });
    }


//for model linking social accounts-------------------------------------------------



}
