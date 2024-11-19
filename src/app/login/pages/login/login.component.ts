import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) { }

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  passwordVisible: boolean = false;
  logosinfondo: string = "assets/images/logosinfondo.png";
  siteKey = '6Ld9vlUpAAAAAIBxg_WAyAL3v782D0Sv_HefWBjy';
  validRecatcha: boolean = true;
  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)]],
  });

  // src/app/login/login.component.ts

  auth() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  
    try {
      let fecha = new Date().toLocaleDateString();
      this.loginService.getIp().subscribe(data => {
        this.loginService.validarUsuario({
          email: this.myForm.controls['email'].value,
          password: this.myForm.controls['password'].value,
          fecha: fecha,
          ip: data.ip
        }).subscribe(res => {
          if (res.status === 200) {
            localStorage.setItem("token", res.token.toString());
            localStorage.setItem("userRole", res.role);
  
            // Mostrar la alerta de sesión iniciada con éxito
            this.showAlert('Sesión iniciada con éxito, Bienvenida@', 'alert-success');
            
            // Enviar la notificación inmediatamente después de la alerta
            this.sendNotification();

            if (res.role === 'admin') {
              this.router.navigate(['/admin/inicioadmin']);
            } else {
              this.router.navigate(['/user/inicio']);
            }
          } else {
            this.handleLoginError(res.status);
          }
        }, error => {
          this.showAlert('Error en el servidor', 'alert-danger');
          console.error(error);
        });
      });
    } catch (error) {
      this.showAlert('Error en el servidor', 'alert-danger');
      console.log(error);
    }
  }
  
  sendNotification() {
    // Verificar si el navegador soporta notificaciones y si el permiso fue otorgado
    if ('serviceWorker' in navigator && Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(swRegistration => {
        // Enviar un mensaje al Service Worker para mostrar la notificación
        swRegistration.active?.postMessage({ type: 'LOGIN_SUCCESS' });
      }).catch(err => {
        console.error('Error al registrar el Service Worker:', err);
      });
    } else {
      console.warn('Permiso de notificación no otorgado o el Service Worker no está disponible.');
    }
  }

  handleLoginError(status: number) {
    if (status === 400) {
      this.showAlert('Contraseña incorrecta', 'alert-danger');
    } else if (status === 409) {
      this.showAlert('Número máximo de intentos alcanzado, espere 5 minutos', 'alert-danger');
    } else if (status === 302) {
      this.showAlert('Correo inválido', 'alert-danger');
    } else {
      this.showAlert('Error desconocido', 'alert-danger');
    }
  }
  
  showAlert(message: string, alertClass: string) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertClass} fixed-top d-flex align-items-center justify-content-center`;
    alertDiv.textContent = message;
    alertDiv.style.fontSize = '20px';

    document.body.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 2000);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  aplicarInterlineado() {
    const elemento = document.querySelector('.pass-link a') as HTMLAnchorElement | null;
    if (elemento) {
      elemento.style.lineHeight = '2';
    }
  }

  isEmailFieldActive(): boolean {
    const emailControl = this.myForm.get('email');
    return emailControl ? emailControl.touched || emailControl.value !== '' : false;
  }

  moveLabelUp(): void {
    const fieldElement = document.querySelector('.field');
    if (fieldElement) {
      fieldElement.classList.add('active');
    }
  }

  moveLabelDown(): void {
    const emailControl = this.myForm.get('email');
    if (emailControl?.invalid) {
      document.querySelector('.field')?.classList.remove('active');
    }
  }

  resaltarInput: boolean = false;

  cambiarColorInput() {
    this.resaltarInput = !this.resaltarInput;
  }

  handleKeyUp(): void {
    if (this.myForm.valid) {
      console.log('Formulario válido');
    } else {
      console.log('Formulario inválido');
    }
  }

  activarBtnCapcha(event: string) {
    this.validRecatcha = false;
  }
}
