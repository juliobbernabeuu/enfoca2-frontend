import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExplorarComponent } from './pages/explorar/explorar.component';
import { CrearComponent } from './pages/crear/crear.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crear', component: CrearComponent },
  { path: 'explorar', component: ExplorarComponent },
  {
    path: 'foto/:id',
    loadComponent: () =>
      import('./foto-detalle/foto-detalle.component').then(
        (m) => m.FotoDetalleComponent
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', redirectTo: '' },
];
