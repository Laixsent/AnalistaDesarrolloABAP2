import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent} from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { PerfilComponent } from './components/perfil/perfil.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'menu', component: SidenavComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'perfil', component: PerfilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
