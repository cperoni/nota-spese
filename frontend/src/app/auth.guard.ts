import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { supabase } from './core/supabase.client';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);

  const { data } = await supabase.auth.getSession();

  if (data.session) {
    return true;
  }

  return router.createUrlTree(['/login']);
};