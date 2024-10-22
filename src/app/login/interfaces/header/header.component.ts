import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CarritoService } from '../../services/carrito.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  menuVariable: boolean = false;
  isLoggedIn: boolean = false;
  totalItemsCarrito: number = 0;
  carritoSubscription: Subscription | null = null;  // Inicializar en null

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private carritoService: CarritoService
  ) { }

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

  openMenu() {
    this.menuVariable = !this.menuVariable;
  }

  checkLoggedIn() {
    this.loginService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn; 
    });
  }

  ngOnInit() {
    this.checkLoggedIn();
    this.obtenerCantidadCarrito(); // Llamamos a la función una sola vez en ngOnInit
  }

  ngOnDestroy() {
    if (this.carritoSubscription) {
      this.carritoSubscription.unsubscribe();  // Desuscribirse
    }
  }

  obtenerCantidadCarrito() {
    if (this.carritoSubscription) {
      this.carritoSubscription.unsubscribe(); // Desuscribirse antes de la nueva suscripción
    }
    this.carritoSubscription = this.carritoService.obtenerItemsDelCarrito().subscribe((items: any[]) => {
      this.totalItemsCarrito = items.reduce((sum, item) => sum + item.cantidad, 0);
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
    this.router.navigate(['/login']);
  }

  cerrarSesion() {
    this.loginService.logout(); 
    this.checkLoggedIn();
    localStorage.clear();
    this.router.navigate(['login']);
    this.showAlert('Sesión cerrada con éxito', 'alert-success');
  }

}
