import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router'; 


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  public rutaActual!: string;
  public nivelDeAcceso!: any;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('sesionIniciada')) {
      this.router.navigate(['/login']);
    }
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {       
        this.rutaActual = this.router.url;
      }
    });
        
  }

  public sidenavfunction(){
    this.sidenav.toggle();
  }

  public cerrarSesion(){
    sessionStorage.removeItem('sesionIniciada');
    this.router.navigate(['/login']);
  }

  get obtenerAcceso(){
    this.nivelDeAcceso = sessionStorage.getItem('sesionIniciada');
    if (JSON.parse(this.nivelDeAcceso).access === 1){
      return true;
    }
    return false;
  }
}
