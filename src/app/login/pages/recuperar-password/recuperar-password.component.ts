import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Email, Password } from '../../interfaces/user.interface';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {
  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) { }
  logosinfondo: string = "assets/images/logosinfondo.png"

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  validStatus: boolean = false;
  validForms: boolean = false;

  validFormularios: boolean = false;
  metodoSeleccionado = false;
  tipo = true;

  code!: string;
  id!: number;
  sending: boolean = false; // Variable para controlar el estado de envío

  pregunta!: string;

  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
  })

  preForm: FormGroup = this.fb.group({
    pregunta: ['', [Validators.required]],
    respuesta: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]*$/)]],
  })

  codeForm: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.min(10)]],
  })
  passwordForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)]],
    password2: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)]],
  }, {
    validators: [
      this.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  })
  public isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;
      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }
      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }
  metodoSelect(tipo: number) {
    if (tipo === 1) {
      this.tipo = true
      this.metodoSeleccionado = true
      this.sendCode()
    }
    else {
      this.tipo = false
      this.metodoSeleccionado = true
      this.checkPregunta()
    }
  }

  checkEmail() {
    this.loginService.checkEmail({ email: this.myForm.controls['email'].value }).subscribe(data => {
      if (data.status === 200) {
        console.log("correo encontrado")
        this.showAlert('Correo encontrado', 'alert-success');
        this.validStatus = true;
      }
      else {
        console.log("no existe el correo")
        this.showAlert('No existe el correo', 'alert-danger');
      }
    })
  }

  checkPregunta() {
    this.loginService.getPregunta({ email: this.myForm.controls['email'].value }).subscribe(data => {
      if (data.status === 200) {
        console.log("pregunta encontrada")
        switch (data.question) {
          case 'perro':
            this.pregunta = "¿Nombre de tu perro?"
            break
          case 'comida':
            this.pregunta = "¿Nombre de tu comida favorita?"
            break
          case 'lugar':
            this.pregunta = "¿Lugar Favorito?"
            break
          case 'deporte':
            this.pregunta = "¿Cuál es tu deporte favorito?"
            break
          case 'libro':
              this.pregunta = "¿Cuál es tu libro favorito?"
              break
          case 'gato':
              this.pregunta = "¿Como se llama tu gato?"
              break;
        }
        
      }
      else {
        console.log("no existe la pregunta")
      }
    })
  }
  checkRespuesta() {
    this.loginService.checkRespuesta({ email: this.myForm.controls['email'].value, respuesta: this.preForm.controls['respuesta'].value }).subscribe(data => {
      if (data.status === 200) {
        console.log("respuesta encontrada")
        this.showAlert('Respuesta correcta', 'alert-success');
        this.validFormularios = true;
      }
      else {
        console.log("no existe la respuesta")
        this.showAlert('Respuesta Incorrecta', 'alert-danger');
      }
    })
  }
  sendCode() {
    if (this.myForm.invalid || this.sending) // Verifica si el formulario es inválido o ya se está enviando
      return;

    this.sending = true; // Cambia el estado a true para mostrar el mensaje de espera.

    const email: Email = {
      to: this.myForm.controls['email'].value
    }
    this.loginService.sendCode(email).subscribe(res => {
      if (res.status === 200) {
        this.validStatus = true;
        this.code = res.codigo;
        this.id = res.id
      }
      console.log(res)
      this.sending = false; // Cambia el estado de envío nuevamente a falso.
    })
  }

  validCode() {
    console.log("si entra")
    if (this.codeForm.invalid) return
    if (this.code === this.codeForm.controls['code'].value) {
      console.log("entra codigo")
      this.validFormularios = true;
    }
    this.showAlert('Codigo Valido', 'alert-success');
  }





  togglePassword(fieldId: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    if (field.type === "password") {
      field.type = "text";
    } else {
      field.type = "password";
    }
  }


  updatePassword() {
    if (this.passwordForm.invalid)
      return

    let fecha = new Date().toLocaleDateString();
    this.loginService.getIp().subscribe(data => {
      const newPasword: Password = {
        password: this.passwordForm.controls['password'].value,
        ip:data.ip,
        fecha:fecha
      }
      this.loginService.cambiarPassword(newPasword, this.myForm.controls['email'].value).subscribe(data => {
        console.log(data)
        this.router.navigate(['/user/login'])
        this.showAlert('Cambio de contraseña exitoso', 'alert-success');
      })
    })
    
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
}
