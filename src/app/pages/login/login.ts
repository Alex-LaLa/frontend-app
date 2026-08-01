import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  email = '';

  password = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ingresarSistema() {

    this.authService
      .login(this.email, this.password)
      .subscribe({

        next: (res) => {

          this.authService.guardarToken(res.token);

          this.router.navigate(['/dashboard']);

        },

        error: () => {

          alert('Correo o contraseña incorrectos');

        }

      });

  }

}