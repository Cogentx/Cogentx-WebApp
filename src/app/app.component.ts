import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { environment } from '../environments/environment';
import { AuthService} from '../app/services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private menu: MenuController,
    private auth: AuthService,
    private storage: Storage,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  closeMenu() {
    this.menu.close();
  }

  async resetTutorial() {
    await this.storage.set(environment.storageKeys.tutorialCompleteKey, false);
    await this.router.navigate(['/tutorial']);
    this.menu.close();
  }
}
