import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { GoogleAuthProvider } from '@angular/fire/auth'
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private fireauth: AngularFireAuth, private router: Router) {}

    logInWithGoogle() {
        return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(
            (res) => {
                this.router.navigate(['/my-collections'])
                localStorage.setItem('token', JSON.stringify(res.user?.uid))
            },
            (err) => {
                alert(err.message)
            }
        )
    }

    logOut() {
        this.fireauth.signOut().then(
            () => {
                localStorage.removeItem('token')
                this.router.navigate(['/login'])
            },
            (err) => {
                alert(err.message)
            }
        )
    }
}
