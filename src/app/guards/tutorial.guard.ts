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

  constructor(private storage: Storage, private router: Router) {
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    const key = environment.storageKeys.tutorialCompleteKey;
    // convert response to a boolean via !! (double-bang)
    const isComplete: boolean = !!await this.storage.get(key);

    if (!isComplete) {
      this.router.navigateByUrl('/tutorial');
    }
    return isComplete;
  }
}
