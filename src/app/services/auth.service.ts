import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';
import { Usuario } from '../models/usuario.model.js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://enfoca2-backend.onrender.com/api/auth';
  usuario: Usuario | null = null;

  constructor(private http: HttpClient) {
    this.cargarSesion();
  }

  login(datos: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, datos).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.usuario = this.decodificarToken(res.token);
      })
    );
  }

  register(datos: { nombre: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, datos);
  }

  logout() {
    this.usuario = null;
    localStorage.removeItem('token');
  }

  private cargarSesion() {
    const token = localStorage.getItem('token');
    if (token) {
      const usuarioDecodificado = this.decodificarToken(token);
      const ahora = Math.floor(Date.now() / 1000);
      if (usuarioDecodificado.exp > ahora) {
        this.usuario = usuarioDecodificado;
      } else {
        this.logout();
      }
    }
  }

  private decodificarToken(token: string): Usuario {
    return jwtDecode(token);
  }

  estaAutenticado(): boolean {
    return !!this.usuario;
  }

  esAdmin(): boolean {
    return this.usuario?.rol === 'admin';
  }

  obtenerNombre(): string {
    return this.usuario?.nombre || '';
  }
}
