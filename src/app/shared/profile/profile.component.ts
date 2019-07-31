import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  // allow data to be passed into this `dumb-component` and used in the .html file
  @Input()
  user;

  constructor() { }

}
