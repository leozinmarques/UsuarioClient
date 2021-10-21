import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUsuariosComponent } from './components/add-usuarios/add-usuarios.component';
import { UsuariosEditComponent } from './components/usuarios-edit/usuarios-edit.component';
import { UsuariosListComponent } from './components/usuarios-list/usuarios-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: UsuariosListComponent },
  { path: 'usuarios/:id', component: UsuariosEditComponent },
  { path: 'add', component: AddUsuariosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
