import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { GoogleAuthProvider } from '@angular/fire/auth'
import { getAuth } from 'firebase/auth'
import { Router } from '@angular/router'
import { NavigationLink } from 'src/app/const'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _loggedIn = new BehaviorSubject<boolean>(false)
    loggedIn$ = this._loggedIn.asObservable()

    constructor(private _fireauth: AngularFireAuth, private router: Router) {
        this._fireauth.onAuthStateChanged((user) => {
            if (user) {
                this._loggedIn.next(true)
            } else {
                this._loggedIn.next(false)
            }
        })
    }

    getUser() {
        return getAuth().currentUser
    }

    getUserId() {
        return this.getUser()?.uid
    }

    async logInWithGoogle() {
        try {
            const result = await this._fireauth.signInWithPopup(
                new GoogleAuthProvider()
            )
            this.router.navigate([`/${NavigationLink.MyCollections}`])
            localStorage.setItem('token', JSON.stringify(result.user?.uid))
        } catch (e) {
            console.log('Login failed', e)
        }
    }

    async logOut() {
        try {
            await this._fireauth.signOut()
            localStorage.removeItem('token')
            this.router.navigate([`/${NavigationLink.Login}`])
        } catch (e) {
            console.log('Logout failed', e)
        }
    }
}
