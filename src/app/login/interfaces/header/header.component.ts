import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService // Inyecta el servicio LoginService
  ) { }

  menuVariable: boolean = false;
  menu_icon_variable: boolean = false;
  isLoggedIn: boolean = false; // Variable para almacenar el estado de autenticación
  
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
    this.menu_icon_variable = !this.menu_icon_variable;
  }


  checkLoggedIn() {
    this.loginService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn; 
    });
  }

  ngOnInit() {
    this.loginService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
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
    this.router.navigate(['/user/login'])
  }

  cerrarSesion() {
    this.loginService.logout(); 
    this.checkLoggedIn();
    localStorage.clear()
    this.router.navigate(['/user/login'])
    this.showAlert('Sesion cerrada con exito', 'alert-success');
  }
}