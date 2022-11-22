import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

export class Snackbar {

  private static _snackBar: MatSnackBar
  private static horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  private static verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar) {
    this._snackBar=_snackBar
  }

  static openSnackBar(text:string) {
    Snackbar._snackBar.open(text, 'fermer', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
