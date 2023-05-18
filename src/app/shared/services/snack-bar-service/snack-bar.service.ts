import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

const DISPLAY_DURATION = 2000

@Injectable({
    providedIn: 'root',
})
export class SnackBarService {
    constructor(private _snackBar: MatSnackBar) {}

    showMessage(message: string) {
        this._snackBar.open(message, 'Close', {
            duration: DISPLAY_DURATION,
        })
    }
}
