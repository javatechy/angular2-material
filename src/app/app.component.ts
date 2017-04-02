import { Component } from '@angular/core';

// Decorator
@Component({
  selector: 'my-app',
  templateUrl: '../app/html/home.html'
})
export class AppComponent  {
  name :string;
  showHobbies :boolean;
  constructor(){
    this.showHobbies=false;
    this.name = 'ZAUTO APP';
  }
  toggleHobbies(){
    if(this.showHobbies==true){
      this.showHobbies=false;
    }else{
      this.showHobbies=true;
    }
  }
}
