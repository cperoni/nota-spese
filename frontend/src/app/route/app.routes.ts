import { Routes } from '@angular/router';
import { Login } from '../features/login/login';
import { authGuard } from '../auth.guard';
import { Shell } from '../layout/shell/shell';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    canActivate: [authGuard],
    component: Shell,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../../app/features/home/home').then(m => m.Home),
      },
      {
        path: 'categorie',
        loadComponent: () =>
          import('../../app/features/categorie/categorie').then(m => m.Categorie),
      },
      {
        path: 'analisi',
        loadComponent: () =>
          import('../../app/features/analisi/analisi').then(m => m.Analisi),
      },
    ],
  },
];
