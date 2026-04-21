import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { supabase } from '../supabase.client';
import type { User } from '@supabase/supabase-js';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = new BehaviorSubject<User | null>(null);
  user$ = this._user.asObservable();

  constructor() {
    this.init();
  }

  async init() {
    const { data } = await supabase.auth.getSession();
    this._user.next(data.session?.user ?? null);

    supabase.auth.onAuthStateChange((_event:AuthChangeEvent, session:Session | null) => {
      this._user.next(session?.user ?? null);
    });
  }

  signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  signOut() {
    return supabase.auth.signOut();
  }

  getUser() {
    return this._user.value;
  }

  isLoggedIn() {
    return !!this._user.value;
  }
}
