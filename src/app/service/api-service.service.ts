import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = 'http://192.168.1.10:3000/api/login/';
    
  constructor(private http: HttpClient) { }

  public buscar(busqueda: string): Observable<any> {
    return this.http.get<any>(`https://openlibrary.org/search.json?q=${busqueda}&fields=*,availability&limit=50`);
  }

  public obtenerPortada(idPortada: string): string {
    return `https://covers.openlibrary.org/b/id/${idPortada}-L.jpg`;
  }
  
  public obtenerTopLibros(bookId: string): Observable<any> {
    return this.http.get<any>(`/book/${bookId}.json`);
  }  

  iniciarSesion(usuario: string, contrasena: string): Observable<any> {
    // No incluyas el objeto 'body' en la URL
    const url = this.apiUrl;

    console.log("Esto es lo que está llegando, usuario: ", usuario, " contraseña: ", contrasena);

    // Realiza una solicitud GET a la URL 'http://192.168.1.10:3000/api/login/'
    return this.http.get<any>(url);
  }
}
