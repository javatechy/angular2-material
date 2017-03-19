// Main app compnent
import { Component, Optional } from '@angular/core';
import {PostsService}  from '../services/posts.service';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
// Decorator
@Component({
  moduleId :module.id,
  selector: 'material',
  templateUrl:'../html/material.html',
  styleUrls: ['../css/material.css']
})
export class MaterialComponent{
isDarkTheme: boolean = false;
lastDialogResult: string;

foods: any[] = [
  {name: 'Pizza', rating: 'Excellent'},
  {name: 'Burritos', rating: 'Great'},
  {name: 'French fries', rating: 'Pretty good'},
];

progress: number = 0;

constructor(private _dialog: MdDialog, private _snackbar: MdSnackBar) {
  // Update the value for the progress-bar on an interval.
  setInterval(() => {
    this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
  }, 200);
}

openDialog() {
  let dialogRef = this._dialog.open(DialogContent);

  dialogRef.afterClosed().subscribe(result => {
    this.lastDialogResult = result;
  })
}

showSnackbar() {
  this._snackbar.open('YUM SNACKS', 'CHEW');
}
}


@Component({
  moduleId :module.id,
  templateUrl :'../html/confirmationDilog.html',
})
export class DialogContent {
  constructor(@Optional() public dialogRef: MdDialogRef<DialogContent>) {

  }
}
