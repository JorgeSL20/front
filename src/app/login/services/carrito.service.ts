// src/app/services/carrito.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ProductoService } from './producto.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'https://proyectogatewayback-production.up.railway.app/carrito';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private productoService: ProductoService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  agregarItem(productoId: number, cantidad: number): Observable<any> {
    return this.productoService.obtenerProductoPorId(productoId).pipe(
      switchMap(producto => {
        const userId = this.authService.getCurrentUserId();
        if (userId !== null) {
          return this.http.post(`${this.apiUrl}/agregar`, {
            productoId,
            cantidad,
            userId,
            productoNombre: producto.producto,
            precio: producto.precio,
            url: producto.url
          }, { headers: this.getAuthHeaders() });
        } else {
          return of(null); // O manejar el caso cuando el usuario no está autenticado
        }
      })
    );
  }

  obtenerItemsDelCarrito(): Observable<any[]> {
    const userId = this.authService.getCurrentUserId();
    if (userId !== null) {
      return this.http.get<any[]>(`${this.apiUrl}/items/${userId}`, { headers: this.getAuthHeaders() }).pipe(
        switchMap(items => {
          if (!Array.isArray(items)) {
            console.error('Formato de datos incorrecto:', items);
            return of([]);
          }

          return this.productoService.obtenerProductos().pipe(
            switchMap(productos => {
              if (!Array.isArray(productos)) {
                console.error('Formato de datos incorrecto:', productos);
                return of([]);
              }

              const itemsConDetalles = items.map(item => {
                const producto = productos.find(p => p.id === item.productoId);
                return {
                  ...item,
                  productoNombre: producto?.producto || 'Desconocido',
                  productoImagen: producto?.url || 'default-image-url',
                  productoPrecio: producto?.precio || 0
                };
              });
              return of(itemsConDetalles);
            })
          );
        })
      );
    } else {
      return of([]); // O manejar el caso cuando el usuario no está autenticado
    }
  }

  eliminarItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${itemId}`, { headers: this.getAuthHeaders() });
  }

  // src/app/services/carrito.service.ts
actualizarCantidad(itemId: number, nuevaCantidad: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/actualizar-cantidad/${itemId}`, { cantidad: nuevaCantidad }, { headers: this.getAuthHeaders() });
}
agregarOActualizarItem(item: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/agregar-o-actualizar`, item, { headers: this.getAuthHeaders() });
}

}
