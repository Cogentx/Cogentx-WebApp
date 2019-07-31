import { Component, ViewChild } from '@angular/core';
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

  constructor(
    private storage: Storage,
    private router: Router,
  ) {}

  @ViewChild('slides') slides: IonSlides;

  async finish() {
    await this.storage.set(
      environment.storageKeys.tutorialCompleteKey,
      true);
    this.router.navigate(['/']);
  }

  next() {
    this.slides.slideNext();
  }
}
