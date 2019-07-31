import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DbService } from './db.service';
import { User } from './user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    private db: DbService,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => (user ? db.doc$(`users/${user.uid}`) : of(null)))
    );

    // this.handleRedirect();
  }

  async anonymousLogin() {
    const credential = await this.afAuth.auth.signInAnonymously();
    return await this.updateUserData(credential.user);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData({ uid, email, displayName, photoURL, isAnonymous }) {
    // sets user data to Firestore on login
    const path = `users/${uid}`;

    const data = {
      uid,
      email,
      displayName,
      photoURL,
      isAnonymous,
    };

    return this.db.updateAt(path, data);
  }

  //// GOOGLE AUTH

  setRedirect(val) {
    this.storage.set(
      environment.storageKeys.authRedirectKey,
      val,
    );
  }

  async isRedirect() {
    return await this.storage.get(
      environment.storageKeys.authRedirectKey
    );
  }

  async googleLogin() {
    try {
      let user;

      if (this.platform.is('cordova')) {
        // native mobile platform app
        user = await this.nativeGoogleLogin();
      } else {
        await this.setRedirect(true);
        const provider = new auth.GoogleAuthProvider();
        user = await this.afAuth.auth.signInWithRedirect(provider);
      }

      return await this.updateUserData(user);

    } catch (err) {
      console.error('auth.service: ', err);
    }
  }

  async nativeGoogleLogin() {

  }

  // private async handleRedirect() {}
}
