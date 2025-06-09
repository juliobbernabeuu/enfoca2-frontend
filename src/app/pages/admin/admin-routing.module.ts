import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { BanUserComponent } from './ban-user/ban-user.component';
import { DeletePhotoComponent } from './delete-photo/delete-photo.component';

const routes: Routes = [
  { path: '', component: AdminPanelComponent },
  { path: 'ban-user', component: BanUserComponent },
  { path: 'delete-photo', component: DeletePhotoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
