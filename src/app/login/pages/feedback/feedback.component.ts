import { Component } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { LoginService } from '../../services/login.service';  // Servicio para obtener el token

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],  // Asegúrate de tener el archivo CSS para los estilos
})
export class FeedbackComponent {
  feedback = {
    rating: '',  // Comentario o calificación proporcionada por el usuario
  };

  constructor(
    private feedbackService: FeedbackService,
    private loginService: LoginService
  ) {}

  // Método para manejar el envío del formulario
  onSubmit() {
    const token = this.loginService.getToken(); // Obtener el token de autenticación

    if (!token) {
      alert('Token no disponible. Por favor, inicie sesión.');
      return;
    }

    // Llamamos al servicio para enviar el feedback
    this.feedbackService.createFeedback(token, this.feedback).subscribe(
      (response) => {
        alert('Feedback enviado con éxito');
        console.log('Feedback response:', response);
        this.feedback.rating = ''; // Limpiar el campo después de enviar
      },
      (error) => {
        console.error('Error al enviar el feedback', error);
        alert('Error al enviar el feedback');
      }
    );
  }
}
