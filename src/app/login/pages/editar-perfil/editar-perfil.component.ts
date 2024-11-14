import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { DataUser } from '../../interfaces/dataUser.interface';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements AfterViewInit {
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
    url: ""
  };

  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement', { static: false }) canvasElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  private stream!: MediaStream;
  isCameraActive: boolean = false;
  photoTaken: Blob | null = null;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    lastNameP: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s]*$/)]],
    lastNameM: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s]*$/)]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    pregunta: ['', [Validators.required]],
    respuesta: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]*$/)]],
    url: ['', []]
  });

  constructor(private fb: FormBuilder, private loginService: LoginService, private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
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
          url: data.url
        });
      });
    }
  }

  activateCamera(): void {
    if (this.videoElement && this.videoElement.nativeElement) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            this.stream = stream;
            this.videoElement.nativeElement.srcObject = stream;
            this.isCameraActive = true;
            console.log('Cámara activada');
          })
          .catch((error) => {
            console.error('Error al acceder a la cámara:', error);
          });
      } else {
        console.error('Tu navegador no soporta acceso a la cámara.');
      }
    } else {
      console.error('videoElement no está disponible en activateCamera');
    }
  }

  takePhoto(): void {
    if (this.canvasElement && this.videoElement) {
      const canvas = this.canvasElement.nativeElement;
      const video = this.videoElement.nativeElement;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            this.photoTaken = blob;
            this.myForm.patchValue({ url: URL.createObjectURL(blob) });
            this.cdRef.detectChanges();
          }
        }, 'image/png');
      }
    }
  }
  
  stopCamera(): void {
    if (this.stream) {
      const tracks = this.stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    this.isCameraActive = false;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.photoTaken = file;
      this.myForm.patchValue({ url: URL.createObjectURL(file) });
      this.cdRef.detectChanges();
    }
  }

  updateData(): void {
    if (this.idUser) {
      const formData = new FormData();

      for (let key in this.myForm.value) {
        if (this.myForm.value[key]) {
          formData.append(key, this.myForm.value[key]);
        }
      }

      if (this.photoTaken) {
        formData.append('file', this.photoTaken, 'photo.png');
      }

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
    alertDiv.style.marginTop = '20px';

    document.body.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 5000);
  }
}
