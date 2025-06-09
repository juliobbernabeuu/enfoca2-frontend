import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-foto-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './foto-detalle.component.html'
})
export class FotoDetalleComponent implements OnInit {
  foto: any;
  comentarios: any[] = [];
  nuevoComentario = '';
  likes = 0;
  yaLeDioLike = false;
  idFoto = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.idFoto = this.route.snapshot.paramMap.get('id') || '';
    this.cargarFotoDetalle();
    this.cargarComentarios();
    this.cargarLikes();
  }

  cargarFotoDetalle() {
    this.http.get(`https://enfoca2-backend.onrender.com/api/fotos/detalle/${this.idFoto}`)
      .subscribe(res => this.foto = res);
  }

  cargarComentarios() {
    this.http.get<any[]>(`https://enfoca2-backend.onrender.com/api/comentarios/${this.idFoto}`)
      .subscribe(res => this.comentarios = res);
  }

  enviarComentario() {
    if (!this.nuevoComentario.trim()) return;

    this.http.post(`https://enfoca2-backend.onrender.com/api/comentarios/${this.idFoto}`, {
      contenido: this.nuevoComentario
    }).subscribe(() => {
      this.nuevoComentario = '';
      this.cargarComentarios();
    });
  }

 cargarLikes() {
  this.http.get<{ total: number }>(`https://enfoca2-backend.onrender.com/api/likes/${this.idFoto}`)
    .subscribe(res => {
      this.likes = res.total;
    });

  // Verifica si el usuario ya dio like
  this.http.get<{ dioLike: boolean }>(`https://enfoca2-backend.onrender.com/api/likes/verificar/${this.idFoto}`, {
  }).subscribe(res => {
    this.yaLeDioLike = res.dioLike;
  });
}


 darLike() {
  if (this.yaLeDioLike) {
    // Quitar like
    this.http.delete(`https://enfoca2-backend.onrender.com/api/likes/${this.idFoto}`, {
    }).subscribe(() => {
      this.yaLeDioLike = false;
      this.likes--;
    });
  } else {
    // Dar like
    this.http.post(`https://enfoca2-backend.onrender.com/api/likes/${this.idFoto}`, {}, {
    }).subscribe(() => {
      this.yaLeDioLike = true;
      this.likes++;
    });
  }
}


  descargar() {
    window.open(this.foto.url, '_blank');
  }

 comprar() {
  this.http.post<{ id: string }>('https://enfoca2-backend.onrender.com/api/pagos/crear-orden', {
    titulo: this.foto.titulo,
    precio: this.foto.precio
  }).subscribe({
    next: (res) => {
      const orderId = res.id;
      // Redirige a PayPal para pagar la orden
      window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`;
    },
    error: (err) => {
      console.error('Error al crear la orden de PayPal', err);
      alert('Error al iniciar el proceso de pago.');
    }
  });
}

}
