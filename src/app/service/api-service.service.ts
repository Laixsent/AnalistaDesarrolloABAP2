import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bml2ZXJzaWRhZF9pZCI6IjIwMDAxNDMwIiwibm9tYnJlIjoiRXJpY2sgQWRyacOhbiBMw7NwZXogUm9qYXMiLCJncnVwbyI6IklER1M3MDMiLCJpYXQiOjE2OTcwNzE3NTIsImV4cCI6MTY5NzA3NTM1Mn0.NS13asC3SQLpjvVA1sVIz3s4tDzAJhM71XJmAy4rQEA";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Max-Disk-Usage': '10mb', // Establece el límite de carga aquí
  }),
  timeout: 20000,
};


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  
    
  constructor(private http: HttpClient) { }
  //OTROS
  public buscar(busqueda: string): Observable<any> {
    return this.http.get<any>(`https://openlibrary.org/search.json?q=${busqueda}&fields=*,availability&limit=50`);
  }

  public obtenerPortada(idPortada: string): string {
    return `https://covers.openlibrary.org/b/id/${idPortada}-L.jpg`;
  }
  
  public obtenerTopLibros(bookId: string): Observable<any> {
    return this.http.get<any>(`/book/${bookId}.json`);
  }  
  // USUARIOS
  iniciarSesion(usuario: string, contrasena: string): Observable<any> {
    const url = 'http://localhost:3000/api/login/';
    const body = { usuario, contrasena };
    return this.http.post<any>(url, body);
  }
  //LIBROS
  registrarLibro(nuevoLibro: any): Observable<any> {
    // console.log(nuevoLibro);    
    const url = 'http://localhost:3000/api/libros/';    
    return this.http.post<any>(url, nuevoLibro);
  }

  actualizarLibro(nuevoLibro: any): Observable<any> {
    console.log(nuevoLibro);    
    const url = 'http://localhost:3000/api/libros/editar';    
    return this.http.post<any>(url, nuevoLibro);
  }

  eliminarLibro(nuevoLibro: any): Observable<any> {
    console.log("Este es el identificador: -->",nuevoLibro);    
    const url = 'http://localhost:3000/api/libros/eliminar';    
    return this.http.post<any>(url, nuevoLibro);
  }

  mostrarLibros(): Observable<any> {
    const url = 'http://localhost:3000/api/libros/';    
    return this.http.get<any>(url);
  }

  // MOSTAR OTRAS UNIVERSIDADES
  mostrarLibrosOtros(url: string): Observable<any> {
    return this.http.get(url, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error en la solicitud:', error);
          return throwError(error);
        })
      );
  }
  // http://8.tcp.us-cal-1.ngrok.io:19217/tiendita/libros

  // UNIVERSIDADES
  obtenerRutas(): Observable<any> {
    const url = 'http://localhost:3000/api/universidades/';    
    return this.http.get<any>(url);
  }

  registrarUniversidad(registro: any): Observable<any> {
    // console.log(nuevoLibro);    
    const url = 'http://localhost:3000/api/universidades/';    
    return this.http.post<any>(url, registro);
  }

  actualizarUniversidad(registro: any): Observable<any> {
    console.log(registro);    
    const url = 'http://localhost:3000/api/universidades/editar';    
    return this.http.post<any>(url, registro);
  }

  eliminarUniversidad(registro: any): Observable<any> {
    const url = 'http://localhost:3000/api/universidades/eliminar';    
    return this.http.post<any>(url, registro);
  }

  // CENTRAL
  autoCompleteCentral(registro: any): Observable<any> {
    const url = 'http://192.168.43.198:8080/api/buscar-libro';    
    return this.http.post<any>(url, registro, {headers: httpOptions.headers});
  }

  mostrarCentral(): Observable<any> {
    let consulta = {
      "filtro": ""
    };
    const url = 'http://192.168.43.198:8080/api/buscar-libro';    
    return this.http.post<any>(url, consulta, {headers: httpOptions.headers});
  }

  recuperarCentral(recuperar: any): Observable<any> {

    const url = 'http://192.168.43.198:8080/api/recuperar-libro';    
    return this.http.post<any>(url, recuperar, {headers: httpOptions.headers});
  }
  

  //POSTMAN
  consultar(): Observable<any> {
    const url = 'http://127.0.0.1:3000/api/login/administrador';
    const email = "omar@gmail.com";
    const apiUrl = `${url}?email=${email}`;
  
    return this.http.get<any>(apiUrl);
  }

  // consultar(): Observable<any> {
  //   const url = 'http://127.0.0.1:3000/api/login/administrador';
  //   const email = "jessy@gmail.com";
  
  //   const body = { email }; // Objeto con los datos que deseas enviar en el cuerpo
  
  //   return this.http.post<any>(url, body);
  // }
  
  

  insertar(): Observable<any> {

    const url = 'http://127.0.0.1:3000/api/login/insertar';   
    let obj = {
      name: "name",
      password: "password",
      email: "email1@gmail.com",
      type: "administrador"
      // type: "cliente",
      // type: "vendedor",
  } 
    return this.http.post<any>(url, obj);
  }

  actualizar(): Observable<any> {

    const url = 'http://127.0.0.1:3000/api/login/actualizar';   
    let obj = {
      name: "Adrian",
      password: "password",
      email: "erick@gmail.com",
      user_type: 1
  } 
    return this.http.post<any>(url, obj);
  }
}
