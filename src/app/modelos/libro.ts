// modelos/libro.ts
export interface libro {
  id: string;
  titulo: string;
  idPortada: string;
  portada: string;
  author_name?: string[]; // Agregamos la propiedad 'author_name' como un arreglo de strings opcional
  first_publish_year?: number; // Agregamos la propiedad 'first_publish_year' como un número opcional
}
