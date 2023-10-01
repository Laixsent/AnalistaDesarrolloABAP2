import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  libroForm: FormGroup;
  libros: any[] = [];
  libroSeleccionado: any;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder,private apiServiceService: ApiServiceService) {
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required],
      idioma: ['', Validators.required],
      autor: ['', Validators.required],
      genero: ['', Validators.required],
      pdf: [null, Validators.required], 
      universidad: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarLibros();
  }

  mostrarDatosFormulario() {
    // this.apiServiceService.buscar(this.buscador).subscribe(
    //   (data: any) => {

    this.libroForm && this.libroForm.valid
      const datosFormulario = `
        Título: ${this.libroForm.get('titulo')?.value}
        Idioma: ${this.libroForm.get('idioma')?.value}
        Autor: ${this.libroForm.get('autor')?.value}
        Género: ${this.libroForm.get('genero')?.value}
        Universidad: ${this.libroForm.get('universidad')?.value}
      `;
      alert(`Datos del formulario:\n${datosFormulario}`);
  }
  

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  cargarLibros() {
   
  }

  crearLibro() {
    if (this.libroForm.valid) {
      const nuevoLibro = { ...this.libroForm.value };
      nuevoLibro.pdf = this.selectedFile;
     
      this.libros.push(nuevoLibro); 
      this.libroForm.reset(); 
    }
  }

  editarLibro() {
    if (this.libroSeleccionado) {
      const libroEditado = { ...this.libroForm.value };
      libroEditado.pdf = this.selectedFile;
     
      const index = this.libros.indexOf(this.libroSeleccionado);
      if (index !== -1) {
        this.libros[index] = libroEditado; 
        this.libroForm.reset(); 
        this.libroSeleccionado = null;
      }
    }
  }


  guardarLibro(){
    alert("Hola");
  }

  seleccionarLibro(libro: any) {
    this.libroSeleccionado = libro;
 
    this.libroForm.patchValue({
      titulo: libro.titulo,
      idioma: libro.idioma,
      autor: libro.autor,
      genero: libro.genero,
      // pdf: libro.pdf, // No es necesario asignar el valor del archivo aquí
      universidad: libro.universidad
    });
  }

  eliminarLibro() {
    if (this.libroSeleccionado) {
      const index = this.libros.indexOf(this.libroSeleccionado);
      if (index !== -1) {
        this.libros.splice(index, 1); 
        this.libroForm.reset(); 
        this.libroSeleccionado = null; 
      }
    }
  }
}
