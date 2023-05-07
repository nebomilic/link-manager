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
    loggedIn = new BehaviorSubject<boolean>(false)
    loggedIn$ = this.loggedIn.asObservable()

    constructor(private fireauth: AngularFireAuth, private router: Router) {
        this.fireauth.onAuthStateChanged((user) => {
            if (user) {
                this.loggedIn.next(true)
            } else {
                this.loggedIn.next(false)
            }
        })
    }

    getUser() {
        return getAuth().currentUser
    }

    async logInWithGoogle() {
        try {
            const result = await this.fireauth.signInWithPopup(
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
            await this.fireauth.signOut()
            localStorage.removeItem('token')
            this.router.navigate([`/${NavigationLink.Login}`])
        } catch (e) {
            console.log('Logout failed', e)
        }
    }
}
