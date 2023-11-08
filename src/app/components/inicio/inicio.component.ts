import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ApiServiceService } from '../../service/api-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
export interface LibroForm {
  id?: number;
  title?: string;
  language?: string;
  genre?: string;
  editorial?: string;
  status?: number;
  file?: any;
}
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  libroForm: any = {
  } as LibroForm; 
  libros: any[] = [];
  libroSeleccionado: any;
  mensajeError: string = '';
  selectedFile: File | null = null;
  modoEdicion: boolean = true; // Indicador para el modo de edición
  nivelDeAcceso!: any;
  constructor(private router: Router, private apiService: ApiServiceService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {    
    if (!sessionStorage.getItem('sesionIniciada')) {
      this.router.navigate(['/login']);
    }
    this.nivelDeAcceso = sessionStorage.getItem('sesionIniciada');
    if (JSON.parse(this.nivelDeAcceso).access === 2){
      this.router.navigate(['/buscar']);
    }
  
    this.mostrar();
  }

  mostrar(){
    this.apiService.mostrarLibros().subscribe(
      (response) => {          
        // console.log(response);
        this.libros = response.data;
      },
      (error) => {
        console.error('Error al obtener los libros', error);
        this.mensajeError = 'Error al registrar. Inténtalo de nuevo más tarde.';
      }
    );
  }

  mostrarDatosFormulario() {
    console.log(this.libroForm);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  guardarLibro() {
    if (this.selectedFile) {
      const nuevoLibro = { ...this.libroForm };

      const reader = new FileReader();
      reader.onload = (event: any) => {
        nuevoLibro.status = 1;
        nuevoLibro.file = event.target.result;
        // console.log(nuevoLibro.file);

        this.apiService.registrarLibro(nuevoLibro).subscribe(
          (response) => {
            this._snackBar.open(response.message, "Aceptar",{duration: 3000});
            this.libroForm = {}; 
            this.selectedFile = null;
            this.mostrar();
          },
          (error) => {
            console.error('Error al registrar', error);
            this.mensajeError = 'Error al registrar. Inténtalo de nuevo más tarde.';
          }
        );
      };
      reader.readAsDataURL(this.selectedFile);
    }else{
      this._snackBar.open("Seleccione una imagen", "Aceptar",{duration: 3000});
    }
  }

  editarLibro(libro: any) {
    if (libro) {
      this.libroForm = null;
      this.libroForm = {... libro} as LibroForm
      this.modoEdicion = false;
    }
  }

  cancelarEdicion() {
    this.libroForm = {};
    this.modoEdicion = true;
  }

  actualizarLibro() {
    if (this.libroSeleccionado) {
      if(!this.selectedFile){
        this.apiService.actualizarLibro(this.libroForm).subscribe(
          (response) => {     
            this._snackBar.open(response.message, "Aceptar",{duration: 3000});      
            this.libroForm = {};
            this.modoEdicion = true;
            this.mostrar();
          },
          (error) => {
            console.error('Error al actualizar', error);
            this.mensajeError = 'Error al actualizar. Inténtalo de nuevo más tarde.';
          }
        );
      }else{
        const nuevoLibro = { ...this.libroForm };
        const reader = new FileReader();
        reader.onload = (event: any) => {
          nuevoLibro.status = 1;
          nuevoLibro.file = event.target.result;

          this.apiService.actualizarLibro(nuevoLibro).subscribe(
            (response) => {
              this.libroForm = {}; 
              this.selectedFile = null;
              this.modoEdicion = true;
              this.mostrar();
            },
            (error) => {
              console.error('Error al actualizar', error);
              this.mensajeError = 'Error al registrar. Inténtalo de nuevo más tarde.';
            }
          );
        };
        reader.readAsDataURL(this.selectedFile);        
      }
    }
  }

  seleccionarLibro(libro: any) {
    this.libroSeleccionado = libro;
    if (this.modoEdicion) {
      this.cancelarEdicion();
    }
  }

  eliminarLibro(libro: any) {
    if (libro) {
      this.apiService.eliminarLibro({id: libro.id}).subscribe(
        (response) => {
          console.log(response);
          this._snackBar.open(response.message, "Aceptar",{duration: 3000});      
          this.mostrar();
        },
        (error) => {
          console.error('Error al actualizar', error);
          this.mensajeError = 'Error al actualizar. Inténtalo de nuevo más tarde.';
        }
      );
    }
  }
}
