import { Component, OnInit } from '@angular/core';
import { Foto } from '../../models/foto.model.js';
import { FotoService } from '../../services/foto.service.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fotosRecientes: Foto[] = [];
  fotosValoradas: Foto[] = [];

  fotosRecientesPorGrupo: Foto[][] = [];
  fotosValoradasPorGrupo: Foto[][] = [];

  constructor(private fotoService: FotoService) {}

  ngOnInit(): void {
    this.fotoService.obtenerTodas().subscribe(fotos => {
      this.fotosRecientes = fotos
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
        .slice(0, 12);
      this.fotosRecientesPorGrupo = this.dividirEnGrupos(this.fotosRecientes, 4);
    });

    this.fotoService.obtenerValoradas().subscribe(fotos => {
      this.fotosValoradas = fotos.slice(0, 12);
      this.fotosValoradasPorGrupo = this.dividirEnGrupos(this.fotosValoradas, 4);
    });
  }

  private dividirEnGrupos(fotos: Foto[], tamGrupo: number): Foto[][] {
    const grupos: Foto[][] = [];
    for (let i = 0; i < fotos.length; i += tamGrupo) {
      grupos.push(fotos.slice(i, i + tamGrupo));
    }
    return grupos;
  }
}
