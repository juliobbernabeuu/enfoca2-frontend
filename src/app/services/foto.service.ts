import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Foto } from '../models/foto.model';

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  private apiUrl = 'https://enfoca2-backend.onrender.com/api/fotos';

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<Foto[]> {
    return this.http.get<Foto[]>(this.apiUrl);
  }

  obtenerValoradas(): Observable<Foto[]> {
    return this.http.get<Foto[]>(`${this.apiUrl}/valoradas`);
  }
 eliminarFoto(id_foto: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id_foto}`);
}
}
