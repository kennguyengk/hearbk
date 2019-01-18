import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { generes } from '../../shared/constants';
import { listCategory } from '../../shared/constants';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  	//all user list
  	usersList: any = '';



  	//data for filtering
  	filterobject: any = {};
  	gender = '';
  	age = '';
  	country = '';
  	state = '';
  	city = '';
  	list = '';
  	genre = '';
  	favartist = '';

  	//data for dropdowns in form
	selection = [];
	countries = [];
	states = [];
	cities = [];
	favArtistList = [];
	listCategory = listCategory;
    add = true;

    constructor(private fb: FormBuilder, private userservice: UserService) {
      this.getUserList();
    }


	 //build form
    filterform = new FormGroup ({
		favArtist: new FormControl(),
		gender: new FormControl(),
		age: new FormControl(),
    });

    createForm() {
    	this.filterform = this.fb.group({
	        favArtist: '',
	        gender: '',
	        age: '',
	    });
  	}



  	ngOnInit() {
  		this.createForm();
  	}

  	olduserList: any = '';
  	getUserList() {
  		this.userservice.userList().subscribe(response => {
  			this.usersList = response.userlist;
  			this.olduserList = response.userlist;
  			// console.log(this.usersList);
  			this.getcountries();

  		});
  	}

  	getcountries() {
  		this.userservice.getcountries().subscribe(response => {
  			this.countries = response.countries;
  			generes.forEach(item => {this.selection.push(item.item_text); });
  			});
  		this.getfavArtist();
  	}

  	//list for dropdown for fav artist
  	getfavArtist() {
  		this.userservice.fav_artist_list().subscribe(response => {
  			this.favArtistList = response.artist;
  		});
  	}

  	//select country
  	onCountrySelected(c_id) {
  		this.userservice.getstates(c_id).subscribe(response => {
  			this.countries.forEach(countryname => {
  			 	if (countryname.id === c_id) {
            		this.filterobject.country = countryname.name.toLowerCase();
        		}
  			});
  			this.states = response.states;
  		});
  	}


  	//state selection
  	onStateSelected(s_id) {
  		this.userservice.getcity(s_id).subscribe(response => {
  			this.states.forEach(statename => {
  			 	if (statename.id === s_id) {
            		this.filterobject.state = statename.name.toLowerCase();
        		}
  			});
  			this.cities = response.cities;
  		});
  	}

  	//city selected
  	onCitySelected(cityname) {
  		this.filterobject.city = cityname.toLowerCase();
  	}

  	// on genre selection
    search_for_age_artist_genre: any = [];
  	onGenreSelected(event) {
  		this.search_for_age_artist_genre.Favoritegenre = event;
  	}

  	//on list selection
  	onListSelected(event) {
  		// this.filterobject.list = event;
  	}

  	//on artist selected
  	onArtistSelected(event) {
  		this.search_for_age_artist_genre.Favoriteartist = event;
  	}



      //simple search
  	searcharray: any = [];
    noresults: any = false;
  	onTagsChanged(event) {
	  		if (event.change === 'add') {
	  			this.searcharray.push(event.tag.displayValue);
	  			if (!this.isAdvanced) {
		  			this.userservice.simpleSearch(this.searcharray).subscribe(response => {
		  				this.usersList = response.userlist;
                           if (!response.userlist.length) {
                                  this.noresults = true;
                              }
		  			});
	  			}
	  		} else if (event.change === 'remove') {
	  			this.searcharray.splice( this.searcharray.indexOf(event.tag.displayValue), 1 );
	  			if (!this.isAdvanced) {
	  				if (!this.searcharray.length) {
	  					this.usersList = this.olduserList;
                          this.noresults = false;
	  				} else {
		  				this.userservice.simpleSearch(this.searcharray).subscribe(response => {
		  					this.usersList = response.userlist;
                              if (!response.userlist.length) {
                                  this.noresults = true;
                              }
				  		});

	  				}
		  		}
	  		}
  	}

  	isAdvanced = false;
  	//changing Advanced filter option to true or false
  	displayFilter(click) {
  		this.isAdvanced = click;
          if (click === false) {
              this.usersList = this.olduserList;
              this.searcharray = [];
              this.noresults = false;
          }
  	}


      //advanced search

       filterdata(data) {

        if (this.searcharray.length != 0) {
                if (data.gender) {
                    this.filterobject.gender = data.gender.toLowerCase();
                }


                if (data.age) {
                    this.search_for_age_artist_genre.age = data.age;
                }

                this.filterobject.tags = this.searcharray;

                this.userservice.advancedsearch(this.filterobject).subscribe(response => {
                    // console.log(response);
                    // console.log("response");


                let keys = [];
                let val = [];
                const selectedF = [];


                keys = Object.keys(this.search_for_age_artist_genre);
                val = Object.values(this.search_for_age_artist_genre);


                const f = 'el.User.Userdetail.';
                const f1 = 'el.User.Userdetail.';
                for (let i = 0; i < keys.length; i++) {
                    if (keys[i] === 'Favoritegenre') {
                        selectedF.push(f + keys[i] + '.includes(\'' + val[i] + '\')');
                    } else if (keys[i] === 'Favoriteartist') {
                        selectedF.push(f + keys[i] + '.includes(\'' + val[i] + '\')');
                    } else if (keys[i] === 'age') {
                          const belowage = val[i] - 10;
                           if (val[i] === '0') {
                              selectedF.push(f + keys[i] + ' > \'' + val[i] + '\'');

                          }
                          if (val[i] === '20') {
                              selectedF.push(f + keys[i] + ' <= \'' + val[i] + '\'');

                          }
                          if (val[i] === '30') {
                              selectedF.push(f + keys[i] + ' >= \'' + val[i] + '\'');
                          }
                          if (val[i] === '40') {
                            selectedF.push(f + keys[i] + ' >= \'' + val[i] + '\'');
                          }
                          if (val[i] === '50') {
                            selectedF.push(f + keys[i] + ' >= \'' + val[i] + '\'');
                          }
                          if (val[i] === '51') {
                            selectedF.push(f + keys[i] + ' >= \'' + val[i] + '\'');
                          }
                    } else {
                        selectedF.push(f + keys[i] + ' === \'' + val[i] + '\'');
                    }
                }

                const result = selectedF.map(function(item, index) {
                    return item;
                    }).join(' && ');


                    const newArray = response.userlist.filter(function (el) {
                        // console.log(eval(result));
                        return eval(result);

                    });
                    this.usersList = newArray;
                        console.log(newArray.length);
                    if (newArray.length === 0) {
                        this.noresults = true;
                    }
                });

                    } else {
                    console.log('tkast');
                    this.popToast();
                }
            }

        popToast() {
        const toast = {
            type: 'success',
            title: 'please input any tag!',
            showCloseButton: false,
            //timeout: 30000
        };
    }

        }






















































































    // filterdata(data){
    //     //if user searches with tags and selections

    //     if (this.searcharray.length != 0) {
    //         // console.log("here lies filter with only tags and selections")
    //          if (data.gender) {
    //             this.filterobject.gender = data.gender.toLowerCase();
    //         }
    //         if (data.age) {
    //                 this.filterobject.age = data.age;
    //         }
    //         if (data.favArtist) {
    //             this.filterobject.favartist = data.favArtist;
    //         }
    //         // console.log(this.searcharray);
    //         // console.log(this.filterobject);
    //         this.userservice.simpleSearch(this.searcharray).subscribe( (response) => {
    //             let responsedata = response
    //             // console.log(responsedata);
    //             let keys = []
    //             let val = []
    //             let selectedF = [];


    //             keys = Object.keys(this.filterobject)
    //             val = Object.values(this.filterobject)


    //             let f = "el.User.Userdetail.";
    //             let f1 = "el.User.Userdetail.";
    //             for(var i=0;i<keys.length;i++){
    //                 if(keys[i] === 'Favoritegenre'){
    //                     selectedF.push(f+keys[i]+".includes('"+val[i]+"')")
    //                 }
    //                 else if(keys[i] === 'Favoriteartist'){
    //                     selectedF.push(f+keys[i]+".includes('"+val[i]+"')")
    //                 }
    //                 else if(keys[i] === 'country'){
    //                     selectedF.push(f+keys[i]+".includes('"+val[i]+"')")
    //                 }
    //                 else if(keys[i] === 'age'){
    //                       let belowage = val[i] - 10;
    //                        if (val[i] === "0") {
    //                           selectedF.push(f+keys[i]+" > '"+val[i]+"'")

    //                       }
    //                       if (val[i] === "20") {
    //                           selectedF.push(f+keys[i]+" <= '"+val[i]+"'")

    //                       }
    //                       if (val[i] === "30") {
    //                           selectedF.push(f+keys[i]+" >= '"+val[i]+"'")
    //                       }
    //                       if (val[i] === "40") {
    //                         selectedF.push(f+keys[i]+" >= '"+val[i]+"'")
    //                       }
    //                       if (val[i] === "50") {
    //                         selectedF.push(f+keys[i]+" >= '"+val[i]+"'")
    //                       }
    //                       if (val[i] === "51") {
    //                         selectedF.push(f+keys[i]+" >= '"+val[i]+"'")
    //                       }
    //                 }
    //                 else{
    //                     selectedF.push(f+keys[i]+" === '"+val[i]+"'")
    //                 }
    //             }
    //             // console.log(selectedF);

    //             var result = selectedF.map(function(item, index) {
    //                 return item
    //                 }).join(' && ')
    //                 // console.log(responsedata);
    //                 console.log(eval(result));
    //                 var newArray = responsedata.filter(function (el) {
    //                     return eval(result);

    //                 });
    //                 this.usersList = newArray;
    //             });
    //         }

    //     //if user selectes only selections then this will work
    //     else{
    //         // console.log(this.filterobject);
    //         // console.log("here lies filter with only selections")
    //         if (data.gender) {
    //             this.filterobject.gender = data.gender.toLowerCase();
    //         }
    //         if (data.age) {
    //                 this.filterobject.age = data.age;
    //         }
    //         if (data.favArtist) {
    //             this.filterobject.favartist = data.favArtist;
    //         }

    //     let keys = []
    //     let val = []
    //     let selectedF = [];


    //     keys = Object.keys(this.filterobject)
    //     val = Object.values(this.filterobject)


    //     let f = "el.User.Userdetail.";
    //     let f1 = "el.User.Userdetail.";
    //     for(var i=0;i<keys.length;i++){
    //         if(keys[i] === 'Favoritegenre'){
    //             selectedF.push(f+keys[i]+".includes('"+val[i]+"')")
    //         }
    //         else if(keys[i] === 'Favoriteartist'){
    //             selectedF.push(f+keys[i]+".includes('"+val[i]+"')")
    //         }
    //         else if(keys[i] === 'country'){
    //             selectedF.push(f+keys[i]+".includes('"+val[i]+"')")
    //         }
    //         else if(keys[i] === 'age'){
    //               let belowage = val[i] - 10;
    //                if (val[i] === "0") {
    //                   selectedF.push(f+keys[i]+" > '"+val[i]+"'")

    //               }
    //               if (val[i] === "20") {
    //                   selectedF.push(f+keys[i]+" <= '"+val[i]+"'")

    //               }
    //               if (val[i] === "30") {
    //                   selectedF.push(f+keys[i]+" >= '"+val[i]+"'")
    //               }
    //               if (val[i] === "40") {
    //                 selectedF.push(f+keys[i]+" >= '"+val[i]+"'")
    //               }
    //               if (val[i] === "50") {
    //                 selectedF.push(f+keys[i]+" >= '"+val[i]+"'")
    //               }
    //               if (val[i] === "51") {
    //                 selectedF.push(f+keys[i]+" >= '"+val[i]+"'")
    //               }
    //         }
    //         else{
    //             selectedF.push(f+keys[i]+" === '"+val[i]+"'")
    //         }
    //     }

    //     var result = selectedF.map(function(item, index) {
    //         return item
    //         }).join(' && ')

    //         var newArray = this.olduserList.filter(function (el) {
    //             // console.log(eval(result));
    //             return eval(result);

    //         });
    //         this.usersList = newArray;
    //     }

    // }




// }
