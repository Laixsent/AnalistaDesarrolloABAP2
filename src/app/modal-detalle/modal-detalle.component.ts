import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-detalle',
  templateUrl: './modal-detalle.component.html',
  styleUrls: ['./modal-detalle.component.css']
})
export class ModalDetalleComponent {
  @Input() libro: any;
  @Input() libro2: any;
  @Output() cerrarModal = new EventEmitter<void>();



  constructor
  (private _snackBar: MatSnackBar
    ){

    }
  cerrar(): void {
    this.cerrarModal.emit();
  }
}
