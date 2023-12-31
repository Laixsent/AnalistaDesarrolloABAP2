import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// MARETIAL COMPONENTS
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';


// COMPONENTS
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import {MatCardModule} from '@angular/material/card';
import { DetalleLibroModalComponent } from './detalle-libro-modal/detalle-libro-modal.component';
import { DetalleLibroBusquedaComponent } from './detalle-libro-busqueda/detalle-libro-busqueda.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import {MatSliderModule} from '@angular/material/slider';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidenavComponent,
    BuscarComponent,
    DetalleLibroModalComponent,
    DetalleLibroBusquedaComponent,
    PerfilComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
