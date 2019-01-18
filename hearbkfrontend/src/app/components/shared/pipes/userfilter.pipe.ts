import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'UserfilterPipe'
})
export class UserfilterPipe implements PipeTransform {

  transform(value: any, args?: any, advance?: any, gender?: any, age?: any, country?: any, state?: any, city?: any, list?: any, genre?: any, favartist?: any, searchbutton?: any): any {
  	// console.log(args);
  	// console.log(advance);
  	// console.log(gender);
  	// console.log(age);
  	// console.log(country);
  	// console.log(state);
  	// console.log(city);
  	// console.log(list);
  	// console.log(genre);
  	// console.log(searchbutton);
  	// args = args.toLowerCase();
	  	if (!advance) {
  		 	return value;

  		// if(args){

		  // 		return  value.filter( it => {
		  //      		return  it.User.Userdetail.fullname.toLowerCase().includes(args) ||  it.User.Userdetail.user_id.toLowerCase().includes(args) ;
		  //   	});
	  	// 	}
  		}
	  	 if (advance) {
  			// if (!args) 	return value;
	  		return value.filter (it => {
	  			// console.log(it.User.userdetail.country);
	  			console.log('sjdfls');
	  			return it.User.Userdetail.fullname.toLowerCase().includes(args) || it.User.Userdetail.gender === gender ||  it.User.Userdetail.country.toLowerCase().includes(country) ;
	  		});
	  	}
   }
}


