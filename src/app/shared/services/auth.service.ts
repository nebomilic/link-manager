import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { GoogleAuthProvider } from '@angular/fire/auth'
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private fireauth: AngularFireAuth, private router: Router) {}

    async getUser() {
        return await this.fireauth.currentUser
    }

    async logInWithGoogle() {
        try {
            const result = await this.fireauth.signInWithPopup(
                new GoogleAuthProvider()
            )
            this.router.navigate(['/my-collections'])
            localStorage.setItem('token', JSON.stringify(result.user?.uid))
        } catch (e) {
            console.log('Login failed', e)
        }
    }

    async logOut() {
        try {
            await this.fireauth.signOut()
            localStorage.removeItem('token')
            this.router.navigate(['/login'])
        } catch (e) {
            console.log('Logout failed', e)
        }
    }
}
