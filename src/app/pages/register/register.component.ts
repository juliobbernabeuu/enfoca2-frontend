import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  usuario = {
    nombre: '',
    email: '',
    password: ''
  };

  mensaje = '';

  constructor(private authService: AuthService) {}

  onRegister(): void {
  this.authService.register(this.usuario).subscribe({
    next: res => this.mensaje = res.mensaje,
    error: err => this.mensaje = err.error?.error || 'Error en el registro'
  });
}
}
