import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.css']
})
export class AgendarComponent implements OnInit {
  constructor(private fb: FormBuilder,private loginService:LoginService) { }

  myForm: FormGroup = this.fb.group({
    fecha: ['', [Validators.required, this.validateAge.bind(this)]],
    hora: ['', [Validators.required]],
    motivo: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    dentista: ['', [Validators.required]]
  });

  ngOnInit() {
  }
  mostrarSeleccion(event: any) {
    const sexoSeleccionado = event.target.value;
    if (sexoSeleccionado === "") {
      alert("El campo es obligatorio");
    } else {
      alert("Has seleccionado: " + sexoSeleccionado);
      // Aquí puedes realizar otras acciones basadas en la selección, como enviar el formulario o actualizar la interfaz de usuario.
    }
  }
  showAlert(message: string, alertClass: string) {
    // Crea un div para el mensaje
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertClass} fixed-top d-flex align-items-center justify-content-center`;
    alertDiv.textContent = message;
    alertDiv.style.fontSize = '20px'; // Cambia el tamaño del texto

    // Agrega el mensaje al cuerpo del documento
    document.body.appendChild(alertDiv);

    // Elimina el mensaje después de unos segundos
    setTimeout(() => {
      alertDiv.remove();
    }, 5000);
  }

  validateAge(control: any): { [key: string]: any } | null {
    const birthdate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();

    if (age < 18) {
      return { underage: true };
    }

    return null;
  }

  addCita(){
    let idByToken = localStorage.getItem('token');
    if(idByToken === null)return
    this.loginService.addCita(this.myForm.value,idByToken).subscribe(data=>{
      console.log(data)
      if(data.status === 200)
      this.showAlert('Cita agendada correctamente', 'alert-success');
    })
  }
}
