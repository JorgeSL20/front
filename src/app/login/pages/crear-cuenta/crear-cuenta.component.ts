import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css'] // Asegúrate de que sea "styleUrls" y no "styleUrl"
})
export class CrearCuentaComponent implements OnInit {
  logosinfondo: string = "assets/images/logosinfondo.png";
  capchaValid: boolean = true;
  siteKey: string;
  passwordVisible1: boolean = false;
  passwordVisible2: boolean = false;

  // Variables para las advertencias de la contraseña
  minLengthWarning: boolean = true;
  uppercaseWarning: boolean = true;
  lowercaseWarning: boolean = true;
  numberWarning: boolean = true;
  specialCharWarning: boolean = true;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {
    this.siteKey = '6Ld9vlUpAAAAAIBxg_WAyAL3v782D0Sv_HefWBjy';
  }

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    lastNameP: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s]*$/)]],
    lastNameM: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s]*$/)]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator.bind(this)]],
    password2: ['', [Validators.required]],
    pregunta: ['', [Validators.required]],
    respuesta: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]*$/)]]
  }, {
    validators: [
      this.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  ngOnInit() {}

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

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) return null;

    // Verifica cada condición
    this.minLengthWarning = password.length < 8;
    this.uppercaseWarning = !/[A-Z]/.test(password);
    this.lowercaseWarning = !/[a-z]/.test(password);
    this.numberWarning = !/\d/.test(password);
    this.specialCharWarning = !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

    if (
      this.minLengthWarning ||
      this.uppercaseWarning ||
      this.lowercaseWarning ||
      this.numberWarning ||
      this.specialCharWarning
    ) {
      return { invalidPassword: true };
    }

    return null;
  }

  getData() {
    if (this.myForm.invalid) return;
    console.log(this.myForm.value);

    this.loginService.crearUsuario(this.myForm.value).subscribe(
      data => {
        console.log(data);
        this.showAlert('Cuenta creada correctamente', 'alert-success');

        setTimeout(() => {
          this.router.navigate(['/admin/login']);
        }, 1000);
      },
      error => {
        console.error(error);
        this.showAlert('El Correo ya está registrado, intente con otro.', 'alert-danger');
      }
    );
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

  activarBtnCapcha(event: string) {
    this.capchaValid = false;
  }

  activarBtnCrear() {
    return this.myForm.invalid || this.capchaValid;
  }

  togglePasswordVisibility(field: number): void {
    if (field === 1) {
      this.passwordVisible1 = !this.passwordVisible1;
    } else if (field === 2) {
      this.passwordVisible2 = !this.passwordVisible2;
    }
  }

  onFocusEvent(): void {
    console.log('Enfoque activado para este método');
  }

  mostrarColorBoton: boolean = false;
  mouseOver: boolean = false;

  onMouseOver() {
    this.mouseOver = true;
  }

  mostrarSeleccion(event: any) {
    const sexoSeleccionado = event.target.value;
    if (sexoSeleccionado === "") {
      alert("El campo es obligatorio");
    } else {
      this.showAlert("Has seleccionado: " + sexoSeleccionado, 'alert-success');
    }
  }

  cambiarColorBoton(activar: boolean) {
    this.mostrarColorBoton = activar;
  }
}
