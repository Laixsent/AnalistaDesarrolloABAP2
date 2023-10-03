import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ApiServiceService } from '../../service/api-service.service';
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

  constructor(private router: Router, private apiService: ApiServiceService) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('sesionIniciada') === "false") {
      this.router.navigate(['/login']);
    }
    this.apiService.mostrarLibros().subscribe(
      (response) => {          
        console.log(response);
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
        console.log(nuevoLibro.file);

        this.apiService.registrarLibro(nuevoLibro).subscribe(
          (response) => {
            this.libroForm = {}; 
            this.selectedFile = null;
            this.apiService.mostrarLibros().subscribe(
              (response) => {          
                console.log(response);
                this.libros = response.data;
              },
              (error) => {
                console.error('Error al obtener los libros', error);
                this.mensajeError = 'Error al registrar. Inténtalo de nuevo más tarde.';
              }
            );
          },
          (error) => {
            console.error('Error al registrar', error);
            this.mensajeError = 'Error al registrar. Inténtalo de nuevo más tarde.';
          }
        );
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  editarLibro(libro: any) {
    if (libro) {
      // console.log('Libro seleccionado:', libro);
      this.libroForm = null;
      this.libroForm = {... libro} as LibroForm
      // console.log(this.libroForm);
      
      this.modoEdicion = false;
    }
  }

  cancelarEdicion() {
    // Reiniciar el objeto libroForm y desactivar el modo de edición
    this.libroForm = {};
    this.modoEdicion = true;
  }

  actualizarLibro() {
    if (this.libroSeleccionado) {
      if(!this.selectedFile){
        this.apiService.actualizarLibro(this.libroForm).subscribe(
          (response) => {
            
            this.libroForm = {};
            this.modoEdicion = true;
            this.apiService.mostrarLibros().subscribe(
                (response) => {          
                  console.log(response);
                  this.libros = response.data;
                },
                (error) => {
                  console.error('Error al obtener los libros', error);
                  this.mensajeError = 'Error al registrar. Inténtalo de nuevo más tarde.';
                }
              );
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
          console.log(nuevoLibro.file);

          this.apiService.actualizarLibro(nuevoLibro).subscribe(
            (response) => {
              this.libroForm = {}; 
              this.selectedFile = null;
              this.apiService.mostrarLibros().subscribe(
                (response) => {          
                  this.libros = response.data;
                },
                (error) => {
                  console.error('Error al obtener los libros', error);
                  this.mensajeError = 'Error al registrar. Inténtalo de nuevo más tarde.';
                }
              );
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

    // Si estamos en modo de edición, cancelarlo
    if (this.modoEdicion) {
      this.cancelarEdicion();
    }
  }

  eliminarLibro(libro: any) {
    if (libro) {
      // console.log('Libro seleccionado:', libro);
      this.apiService.eliminarLibro({id: libro.id}).subscribe(
        (response) => {
          
          // this.libroForm = {};
          // this.modoEdicion = true;
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
        },
        (error) => {
          console.error('Error al actualizar', error);
          this.mensajeError = 'Error al actualizar. Inténtalo de nuevo más tarde.';
        }
      );
    }
  }
}
