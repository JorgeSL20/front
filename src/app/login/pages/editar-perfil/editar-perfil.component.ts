import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    pregunta: "",
    respuesta: "",
    role: "",
    url:""
  };

  imageUrl: string | null = null; // Variable para la URL de la imagen seleccionada

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    lastNameP: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s]*$/)]],
    lastNameM: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s]*$/)]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    pregunta: ['', [Validators.required]],
    respuesta: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]*$/)]],
    url: ['']  // Verifica que el control 'url' esté definido aquí
  });
  

  constructor(private fb: FormBuilder, private loginService: LoginService) { }

   ngOnInit(): void {
    this.idUser = localStorage.getItem('token');
    if (this.idUser) {
      this.loginService.getDataUser(this.idUser).subscribe(data => {
        this.myForm.setValue({
          name: data.name,
          lastNameP: data.lastNameP,
          lastNameM: data.lastNameM,
          email: data.email,
          pregunta: data.pregunta,
          respuesta: data.respuesta,
          url: data.url // Asignar la URL de la imagen al form
        });
        this.imageUrl = data.url; // Si ya tiene imagen, mostrarla
      });
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.myForm.patchValue({ url: this.imageUrl });  // Actualiza la URL de la imagen en el formulario
      };
      reader.readAsDataURL(file);
    }
  }

  updateData(): void {
    if (this.idUser) {
      this.loginService.updateUser(this.idUser, this.myForm.value).subscribe(
        () => this.showAlert('Datos actualizados', 'alert-success'),
        (error) => this.showAlert(`Error: ${error.message}`, 'alert-danger')
      );
    }
  }

  showAlert(message: string, alertClass: string): void {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertClass} fixed-top d-flex align-items-center justify-content-center`;
    alertDiv.textContent = message;
    alertDiv.style.fontSize = '20px';

    document.body.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 2000);
  }
}
