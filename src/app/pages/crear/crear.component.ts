import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Categoria {
  id_categoria: number;
  nombre_categoria: string;
}

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear.component.html'
})
export class CrearComponent implements OnInit {
  categorias: Categoria[] = [];

  foto: any = {
    titulo: '',
    id_categoria: '',
    localizacion_nombre: '',
    descargable: 1,
    precio: 0
  };

  archivo!: File;
  private apiUrl = 'https://enfoca2-backend.onrender.com/api';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.http.get<Categoria[]>(`${this.apiUrl}/categorias`).subscribe({
      next: (res) => this.categorias = res,
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  onDescargableChange(): void {
    if (this.foto.descargable == 1) {
      this.foto.precio = 0;
    }
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.archivo = event.target.files[0];
    }
  }

  onSubmit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Usuario no autenticado');
      return;
    }

    if (!this.archivo) {
      alert('Debe seleccionar una imagen');
      return;
    }

    const categoria = this.categorias.find(cat => cat.id_categoria == this.foto.id_categoria);
    const nombre_categoria = categoria ? categoria.nombre_categoria : '';

    const formData = new FormData();
    formData.append('titulo', this.foto.titulo);
    formData.append('id_categoria', this.foto.id_categoria);
    formData.append('nombre_categoria', nombre_categoria);
    formData.append('localizacion_nombre', this.foto.localizacion_nombre);
    formData.append('descargable', String(this.foto.descargable));
    formData.append('precio', String(this.foto.descargable == 1 ? 0 : this.foto.precio));
    formData.append('archivo', this.archivo);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.post(`${this.apiUrl}/fotos`, formData, { headers }).subscribe({
      next: () => {
        alert('Foto subida con éxito');
        this.resetFormulario();
      },
      error: (err) => {
        console.error('Error al subir la foto:', err);
        alert('Error al subir la foto');
      }
    });
  }

  resetFormulario(): void {
    this.foto = {
      titulo: '',
      id_categoria: '',
      localizacion_nombre: '',
      descargable: 1,
      precio: 0
    };
    this.archivo = undefined!;
  }
}
