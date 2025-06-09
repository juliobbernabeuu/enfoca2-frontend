import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-explorar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, NgStyle],
  templateUrl: './explorar.component.html',
})
export class ExplorarComponent implements OnInit {
  categorias: Categoria[] = [];

filtro = {
  orden: 'fecha',
  precio: '',
  categoria: ''
};

  fotos: any[] = [];
  hoveredIndex: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  this.cargarCategorias();
  this.aplicarFiltros();
}

cargarCategorias() {
  this.http.get<Categoria[]>('https://enfoca2-backend.onrender.com/api/categorias')
    .subscribe({
      next: (res) => this.categorias = res,
      error: (err) => console.error('Error al cargar categorías:', err)
    });
}
aplicarFiltros(): void {
  let params = new HttpParams();

  if (this.filtro.orden) params = params.set('orden', this.filtro.orden);
  if (this.filtro.precio) params = params.set('precio', this.filtro.precio);
  if (this.filtro.categoria) params = params.set('categoria', this.filtro.categoria); // ✅ FALTA ESTO

  this.http.get<any[]>('https://enfoca2-backend.onrender.com/api/fotos/filtrar', { params }).subscribe({
    next: data => this.fotos = data,
    error: err => console.error('Error al cargar fotos:', err)
  });
}


  descargar(foto: any): void {
    console.log('Descargando:', foto.titulo);
    // Lógica real de descarga si la implementas
  }

  comprar(foto: any): void {
    console.log('Foto de pago:', foto.titulo, 'Precio:', foto.precio);
    // Lógica para redirigir al pago
  }
}
