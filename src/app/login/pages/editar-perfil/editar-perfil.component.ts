import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { DataUser } from '../../interfaces/dataUser.interface';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  idUser: string | null = "";
  dataUser: DataUser = {
    name: "",
    lastNameP: "",
    lastNameM: "",
    email: "",
    pregunta:"",
    respuesta:"",
  };

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    lastNameP: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s]*$/)]],
    lastNameM: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s]*$/)]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    pregunta: ['', [Validators.required]],
    respuesta: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]*$/)]]
  });

  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  onFocusEvent(): void {
    console.log('Enfoque activado para este método');
  }
  ngOnInit() {
    this.idUser = localStorage.getItem('token');
    if (this.idUser !== null) {
      this.loginService.getDataUser(this.idUser).subscribe(data => {
        this.myForm.setValue(
          {
          name:data.name,
          lastNameP:data.lastNameP,
          lastNameM:data.lastNameM,
          email:data.email,
          pregunta:data.pregunta,
          respuesta:data.respuesta
        });
        console.log(this.myForm.value)
      })
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
    }, 2000);
  }

  updateData() {
    if (this.idUser !== null)
      this.loginService.updateUser(this.idUser, this.myForm.value).subscribe(data => {
        console.log(data)
        this.showAlert('Datos actualizados', 'alert-success');
      })
  }
}
