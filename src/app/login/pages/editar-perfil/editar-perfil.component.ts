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

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    lastNameP: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s]*$/)]],
    lastNameM: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s]*$/)]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    pregunta: ['', [Validators.required]],
    respuesta: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]*$/)]],
    url: ['', []] // La URL de la imagen
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
          url: data.url // Inicializar la URL de la imagen
        });
      });
    }
  }

  // Método para manejar la carga del archivo
  onFileChange(event: any): void {
    const file = event.target.files[0];
  
    // Crear una instancia de Image para cargar la imagen
    const img = new Image();
    const reader = new FileReader();
  
    reader.readAsDataURL(file);
    reader.onload = () => {
      img.src = reader.result as string;
      img.onload = () => {
        const width = img.width;
        const height = img.height;
  
        // Redimensionar la imagen si excede las dimensiones de 800x800 píxeles
        const maxWidth = 800;
        const maxHeight = 800;
  
        // Calcular el factor de escala para redimensionar la imagen
        const scaleFactor = Math.min(maxWidth / width, maxHeight / height);
        const newWidth = width * scaleFactor;
        const newHeight = height * scaleFactor;
  
        // Crear un canvas para redimensionar la imagen
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        if (ctx) {
          // Configurar el canvas con las nuevas dimensiones
          canvas.width = newWidth;
          canvas.height = newHeight;
  
          // Dibujar la imagen redimensionada en el canvas
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
  
          // Convertir la imagen redimensionada a base64
          const resizedImage = canvas.toDataURL(file.type);
  
          // Asignar la imagen redimensionada al formulario
          this.myForm.patchValue({
            url: resizedImage
          });
        }
      };
    };
  }
  


updateData(): void {
  if (this.idUser) {
    // Crear un objeto FormData para enviar los datos del formulario y el archivo
    const formData = new FormData();

    // Agregar los campos del formulario a FormData
    for (let key in this.myForm.value) {
      if (this.myForm.value[key]) {
        formData.append(key, this.myForm.value[key]);
      }
    }

    // Si hay un archivo, agregarlo también
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement | null;
    if (fileInput && fileInput.files) {
      const file: File | null = fileInput.files[0] || null;
      if (file) {
        formData.append('file', file);
      }
    }

    // Llamar al servicio para actualizar los datos, pasando formData
    this.loginService.updateUser(this.idUser, formData).subscribe(
      () => this.showAlert('Datos actualizados', 'alert-success'),
      (error) => {
        console.error('Error al actualizar los datos:', error);
        this.showAlert(`Error: ${error.message}`, 'alert-danger');
      }
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
