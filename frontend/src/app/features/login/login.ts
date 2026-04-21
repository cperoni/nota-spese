import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async login() {
    this.loading = true;
    this.error = '';

    const { error } = await this.auth.signIn(this.email, this.password);

    this.loading = false;

    if (error) {
      this.error = error.message;
      return;
    }

    this.router.navigateByUrl('/');
  }
}