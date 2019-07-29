import { Component, ViewChild, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { IonSlide, IonSlides } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage {

  // isCompleteKey = 'tutorialComplete';

  constructor(
    private storage: Storage,
    private router: Router,
  ) {}

  @ViewChild('slides') slides: IonSlides;

  async finish() {
    const key = environment.storageKeys.tutorialCompleteKey;
    await this.storage.set(key, true);
    this.router.navigateByUrl('/');
  }

  next() {
    this.slides.slideNext();
  }
}
