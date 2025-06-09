import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credenciales = {
    email: '',
    password: ''
  };

  mensaje = '';

  constructor(private authService: AuthService) {}

onLogin(): void {
  this.authService.login(this.credenciales).subscribe({
    next: res => {
      this.mensaje = res.mensaje;
    },
    error: err => this.mensaje = err.error?.error || 'Error al iniciar sesión'
  });
}

}
