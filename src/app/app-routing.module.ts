import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent} from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'inicio', component: InicioComponent },
  { path: 'menu', component: SidenavComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
