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
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem("token", res.token.toString())
            this.router.navigate(['/user/inicio']);
            this.showAlert('Sesion iniciada con exito, Bienvenida@', 'alert-success');

          } else if (res.status === 400) {
            this.showAlert('Contraseña incorrecta', 'alert-danger');
          } else if (res.status === 409) {
            this.showAlert('Sobrepasaste el numero de intentos, espere 5 minutos', 'alert-danger');
          } else if (res.status === 302) {
            this.showAlert('Email incorrecto', 'alert-danger');
          } else {
            this.showAlert('Error de lo que sea pero error', 'alert-danger');
          }
        });
      })

    } 
    catch (error) {
          this.showAlert('Email no encontrado', 'alert-danger');
          console.log(error);
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



  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  aplicarInterlineado() {
    const elemento = document.querySelector('.pass-link a') as HTMLAnchorElement | null;
    if (elemento) {
      elemento.style.lineHeight = '2'; // Cambia este valor según tus preferencias de interlineado
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

