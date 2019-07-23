import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProfileComponent } from '../shared/profile/profile.component';
import { LoginComponent } from '../shared/login/login.component';

@NgModule({
  declarations: [
    ProfileComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    ProfileComponent,
    LoginComponent,
  ]
})
export class SharedModule { }
