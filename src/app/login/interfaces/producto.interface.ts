// src/app/interfaces/producto.interface.ts
export interface Producto {
  id: number;
  url: string; // Esta propiedad representa la URL de la imagen del producto
  producto: string;
  categoria: string;
  marca: string;
  descripcion: string;
  precio: number;
  existencias: number;
}
