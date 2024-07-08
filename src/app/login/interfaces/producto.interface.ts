export interface Producto {
    id: number;
    imagenP: string; // Cambio de tipo de dato a File para la imagen
    producto: string;
    categoria: string;
    marca: string;
    descripcion: string;
    precio: string;
    existencias: string;
  }