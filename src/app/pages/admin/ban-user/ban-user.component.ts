import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ban-user',
  imports:[CommonModule,FormsModule],
  templateUrl: './ban-user.component.html',
})
export class BanUserComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario | null = null;
  diasBloqueo: number = 1;
  mensaje: string = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error(err)
    });
  }

  seleccionarUsuario(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
  }

  bloquearUsuario() {
    if (!this.usuarioSeleccionado) return;

    this.usuarioService.bloquearUsuario(this.usuarioSeleccionado.id_usuario, this.diasBloqueo).subscribe({
      next: () => {
        this.mensaje = `Usuario ${this.usuarioSeleccionado?.nombre} bloqueado por ${this.diasBloqueo} día(s).`;
        this.usuarioSeleccionado = null;
        this.cargarUsuarios();
      },
      error: () => this.mensaje = 'Error al bloquear el usuario.'
    });
  }
}
