import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  // UrlTree,
  CanActivate,
  Router,
} from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TutorialGuard implements CanActivate  {

  constructor(
    private storage: Storage,
    private router: Router,
    ) {
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    // convert response to a boolean via !! (double-bang)
    const isComplete: boolean =
      !!await this.storage.get(environment.storageKeys.tutorialCompleteKey);

    if (!isComplete) {
      this.router.navigate(['/tutorial']);
    }
    return isComplete;
  }
}
