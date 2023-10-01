import { Component } from '@angular/core';
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

  iniciarSesion() {
    if (this.usuario && this.contrasena) {
      this.apiService.iniciarSesion(this.usuario, this.contrasena).subscribe(
        (response) => {
          if (response && response.exitoso) {
            this.router.navigate(['/inicio']);
          } else {
            this.mensajeError = 'Credenciales incorrectas. Inténtalo de nuevo.';
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
