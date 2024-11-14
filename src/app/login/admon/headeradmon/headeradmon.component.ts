import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataUser } from '../../interfaces/dataUser.interface';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-headeradmon',
  templateUrl: './headeradmon.component.html',
  styleUrls: ['./headeradmon.component.css']
})
export class HeaderadmonComponent implements OnInit {
  
  menuVariable: boolean = false;
  isLoggedIn: boolean = false; // Variable para almacenar el estado de autenticación

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService // Inyecta el servicio LoginService
  ) { }


  totalItemsCarrito: number = 0;
  carritoSubscription: Subscription | null = null;  // Inicializar en null
  dataUser: DataUser = {
    name: '',
    lastNameP: '',
    lastNameM: '',
    email: '',
    pregunta: '',
    respuesta: '',
    role: '',
    url: '',  // Asegúrate de inicializar la URL de la imagen
  };


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

  openMenu() {
    this.menuVariable = !this.menuVariable;
  }

  loadUserData() {
    const idUser = localStorage.getItem('token');
    if (idUser !== null) {
      this.loginService.getDataUser(idUser).subscribe(data => {
        this.dataUser = data;  // Asignar los datos del usuario a la propiedad dataUser
      });
    }
  }

  checkLoggedIn() {
    this.loginService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn; 
    });
  }

  ngOnInit() {
    this.checkLoggedIn();
    this.loadUserData(); 
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  navigateToSection(sectionId: string): void {
    this.router.navigate([], {
      fragment: sectionId,
      relativeTo: this.route,
      queryParamsHandling: 'merge'
    });
    this.scrollToSection(sectionId);
  }

  navegar() {
    this.router.navigate(['/login']);
  }

  cerrarSesion() {
    this.loginService.logout(); 
    this.checkLoggedIn();
    localStorage.clear();
    this.router.navigate(['/login']);
    this.showAlert('Sesión cerrada con éxito', 'alert-success');
  }

}
