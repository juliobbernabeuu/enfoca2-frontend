import { Component, OnInit } from '@angular/core';
import { FotoService } from '../../../services/foto.service';
import { Foto } from '../../../models/foto.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-photo',
  imports:[CommonModule,FormsModule],
  templateUrl: './delete-photo.component.html'
})
export class DeletePhotoComponent implements OnInit {
  fotos: Foto[] = [];
  fotoSeleccionada: Foto | null = null;
  mensaje: string = '';
  cargando: boolean = false;

  constructor(private fotoService: FotoService) {}

  ngOnInit() {
    this.cargarFotos();
  }

  cargarFotos() {
    this.cargando = true;
    this.fotoService.obtenerTodas().subscribe({
      next: (data) => {
        this.fotos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.mensaje = 'Error al cargar las fotos.';
        this.cargando = false;
      }
    });
  }

  seleccionarFoto(foto: Foto) {
    this.fotoSeleccionada = foto;
  }

  eliminarFoto(foto: Foto) {
    if (!confirm(`¿Seguro que quieres eliminar la foto "${foto.titulo}"?`)) return;

    this.fotoService.eliminarFoto(foto.id_foto).subscribe({
      next: () => {
        this.mensaje = `✅ Foto "${foto.titulo}" eliminada correctamente.`;
        this.fotos = this.fotos.filter(f => f.id_foto !== foto.id_foto);
        if (this.fotoSeleccionada?.id_foto === foto.id_foto) {
          this.fotoSeleccionada = null;
        }
      },
      error: (err) => {
        console.error(err);
        this.mensaje = '❌ Error al eliminar la foto.';
      }
    });
  }
}
