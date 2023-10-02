import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  libroForm: FormGroup;
  libros: any[] = [];
  libroSeleccionado: any;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required],
      idioma: ['', Validators.required],
      autor: ['', Validators.required],
      genero: ['', Validators.required],
      universidad: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  mostrarDatosFormulario() {
    // Puedes usar esta función para imprimir los datos del formulario
    console.log(this.libroForm.value);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  guardarLibro() {
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

  seleccionarLibro(libro: any) {
    this.libroSeleccionado = libro;

    this.libroForm.patchValue({
      titulo: libro.titulo,
      idioma: libro.idioma,
      autor: libro.autor,
      genero: libro.genero,
      universidad: libro.universidad,
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
