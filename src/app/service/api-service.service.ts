// servicio.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(private http: HttpClient) { }

  public buscar(busqueda: string): Observable<any> {
    return this.http.get<any>(`https://openlibrary.org/search.json?q=${busqueda}&fields=*,availability&limit=5`);
  }

  public obtenerPortada(idPortada: string): string {
    return `https://covers.openlibrary.org/b/id/${idPortada}-L.jpg`;
  }
  
  public obtenerTopLibros(bookId: string): Observable<any> {
    return this.http.get<any>(`/book/${bookId}.json`);
  }  
  
}
