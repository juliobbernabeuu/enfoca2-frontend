import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  exitoLogin = false;
exitoRegistro = false;


  cerrarForm(event: MouseEvent) {
  this.mostrarLogin = false;
  this.mostrarRegistro = false;
}

  // Datos login
  credenciales = {
    email: '',
    password: ''
  };

  // Datos registro
  usuario = {
    nombre: '',
    email: '',
    password: ''
  };

  mensajeLogin = '';
  mensajeRegistro = '';

  constructor(public auth: AuthService) {}

mostrarLogin = false;
mostrarRegistro = false;

toggleLogin() {
  this.mostrarLogin = !this.mostrarLogin;
  if (this.mostrarLogin) this.mostrarRegistro = false;
}

toggleRegistro() {
  this.mostrarRegistro = !this.mostrarRegistro;
  if (this.mostrarRegistro) this.mostrarLogin = false;
}


onLogin(): void {
  this.auth.login(this.credenciales).subscribe({
    next: res => {
      this.exitoLogin = true;
      this.mensajeLogin = res.mensaje;
      if (!this.mensajeLogin) this.mostrarLogin = false;
    },
    error: err => {
      this.exitoLogin = false;
      this.mensajeLogin = err.error?.error || 'Error al iniciar sesión';
    }
  });
}


  onRegister(): void {
  this.auth.register(this.usuario).subscribe({
    next: res => {
      this.exitoRegistro = true;
      this.mensajeRegistro = res.mensaje;
      if (!this.mensajeRegistro) this.mostrarRegistro = false;
    },
    error: err => {
      this.exitoRegistro = false;
      this.mensajeRegistro = err.error?.error || 'Error en el registro';
    }
  });
}
idiomaActual = 'es';

ngOnInit() {
  const saved = localStorage.getItem('lang');
  if (saved) this.idiomaActual = saved;
}

toggleIdioma() {
  this.idiomaActual = this.idiomaActual === 'es' ? 'en' : 'es';
  localStorage.setItem('lang', this.idiomaActual);

  const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
  if (select) {
    select.value = this.idiomaActual;
    select.dispatchEvent(new Event('change'));
  }
}

}
