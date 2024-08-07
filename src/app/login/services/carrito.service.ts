import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
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
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  agregarItem(productoId: number, cantidad: number): Observable<any> {
    return this.productoService.obtenerProductoPorId(productoId).pipe(
      switchMap(producto => {
        const userId = this.authService.getCurrentUserId();
        if (userId !== null) {
          return this.http.post(`${this.apiUrl}/agregar-o-actualizar`, {
            productoId,
            cantidad,
            userId
          }, { headers: this.getAuthHeaders() });
        } else {
          return of(null); // Manejar el caso cuando el usuario no está autenticado
        }
      }),
      catchError(error => {
        console.error('Error al agregar item:', error);
        return of(null);
      })
    );
  }

  obtenerItemsDelCarrito(): Observable<any[]> {
    const userId = this.authService.getCurrentUserId();
    if (userId !== null) {
      return this.http.get<any[]>(`${this.apiUrl}/items/${userId}`, { headers: this.getAuthHeaders() }).pipe(
        catchError(error => {
          console.error('Error al obtener items del carrito:', error);
          return of([]);
        })
      );
    } else {
      return of([]); // Manejar el caso cuando el usuario no está autenticado
    }
  }

  eliminarItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${itemId}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error al eliminar item del carrito:', error);
        return of(null);
      })
    );
  }

  actualizarCantidad(id: number, cantidad: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/carrito/actualizar-cantidad/${id}`, { cantidad });
}

  vaciarCarrito(): Observable<any> {
    const userId = this.authService.getCurrentUserId();
    if (userId !== null) {
      return this.http.delete(`${this.apiUrl}/vaciar/${userId}`, { headers: this.getAuthHeaders() }).pipe(
        catchError(error => {
          console.error('Error al vaciar el carrito:', error);
          return of(null);
        })
      );
    } else {
      return of(null); // Manejar el caso cuando el usuario no está autenticado
    }
  }

  procesarPago(): Observable<any> {
    const userId = this.authService.getCurrentUserId();
    if (userId !== null) {
      return this.http.post(`${this.apiUrl}/procesar-pago/${userId}`, {}, { headers: this.getAuthHeaders() }).pipe(
        catchError(error => {
          console.error('Error al procesar el pago:', error);
          return of(null);
        })
      );
    } else {
      return of(null); // Manejar el caso cuando el usuario no está autenticado
    }
  }

  agregarOActualizarItem(item: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar-o-actualizar`, item, { headers: this.getAuthHeaders() });
  }

  
}
