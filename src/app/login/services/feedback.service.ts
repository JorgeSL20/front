import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 // Asegúrate de que la URL base esté configurada aquí
import { Feedback } from '../interfaces/feedback.interface';  // Importa el interfaz

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private apiUrl = `https://proyectogatewayback-production.up.railway.app/feedback`;  // Asegúrate de que apiUrl esté correctamente configurado en environment

  constructor(private http: HttpClient) {}

  // Método para enviar el feedback al backend
  createFeedback(feedbackData: Feedback): Observable<any> {
    // Llamada HTTP POST al backend para crear el feedback
    return this.http.post<any>(this.apiUrl, feedbackData);
  }
}
