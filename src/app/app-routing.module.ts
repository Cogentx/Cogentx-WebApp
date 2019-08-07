import { NgModule } from '@angular/core';
import {
  RouterModule, Routes } from '@angular/router';
import { TutorialGuard } from './guards/tutorial.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [TutorialGuard],
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
  },
  {
    path: 'todo',
    loadChildren: './todo/todo.module#TodoPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'tutorial',
    loadChildren: './tutorial/tutorial.module#TutorialPageModule',
  },
];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
