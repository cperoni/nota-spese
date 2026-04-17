import { Routes } from '@angular/router';
import { Login } from '../features/login/login';
import { authGuard } from '../auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../../app/features/home/home').then(m => m.Home),
  },
];