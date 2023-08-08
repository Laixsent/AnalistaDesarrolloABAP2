// modelos/libro.ts
export interface libro {
  id: string;
  titulo: string;
  idPortada: string;
  portada: string;
  author_name?: string[]; 
  first_publish_year?: number; 
}
