import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detalle-libro-modal',
  templateUrl: './detalle-libro-modal.component.html',
  styleUrls: ['./detalle-libro-modal.component.css']
})
export class DetalleLibroModalComponent {
  @Input() libro: any;
  @Output() cerrarModal = new EventEmitter<void>();
  
  // Lógica adicional si es necesaria
  constructor(){
    // console.log("Esten es el objeto del libro",this.libro);
    
  }

  cerrar(): void {
    this.cerrarModal.emit();
  }
}
