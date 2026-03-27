import { Routes } from '@angular/router';
import { Login } from '../app/pages/login/login';
import { authGuard } from '../app/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../app/pages/home/home').then(m => m.Home),
  },
];