import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ApiServiceService } from '../service/api-service.service';
// SNACK-BAR
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';
  mensajeError: string = '';

  constructor(private apiService: ApiServiceService, private router: Router,private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // this.apiService.recuperar().subscribe(
    // this.apiService.actualizar().subscribe(
    // this.apiService.insertar().subscribe(
    // this.apiService.consultar().subscribe(
    //   (response) => {          
    //     console.log(response);        
    //   },
    //   (error) => {
    //     console.error('Error al iniciar sesión', error);
    //   }
    // );
  }

  iniciarSesion() {
    if (this.usuario && this.contrasena) {
      this.apiService.iniciarSesion(this.usuario, this.contrasena).subscribe(
        (response) => {          
          if (response) {
            console.log(response);
            if(response.status !== 1){
              this._snackBar.open(response.message, "Aceptar",{duration: 3000});
            }else{
              sessionStorage.setItem('sesionIniciada', JSON.stringify(response.data));
              this.router.navigate(['/buscar']);
            }         
            
          } else {
            this.mensajeError = 'Credenciales incorrectas. Inténtalo de nuevo.';
            sessionStorage.setItem('sesionIniciada', 'false');
          }
        },
        (error) => {
          console.error('Error al iniciar sesión', error);
          this.mensajeError = 'Ocurrió un error al iniciar sesión. Inténtalo de nuevo más tarde.';
        }
      );
    }
  }
}
