import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';
  mensajeError: string = '';

  constructor(private apiService: ApiServiceService, private router: Router) {}

  ngOnInit(): void {
    // this.apiService.actualizar().subscribe(
    this.apiService.insertar().subscribe(
    // this.apiService.consultar().subscribe(
      (response) => {          
        console.log(response);        
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
      }
    );
  }

  iniciarSesion() {
    if (this.usuario && this.contrasena) {
      this.apiService.iniciarSesion(this.usuario, this.contrasena).subscribe(
        (response) => {          
          if (response) {
            sessionStorage.setItem('sesionIniciada', response);
            this.router.navigate(['/inicio']);
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
