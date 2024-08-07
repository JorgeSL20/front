import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; // Importa MatIconModule
import { GoogleMapsModule } from '@angular/google-maps';

import { RouterModule } from '@angular/router';

import { CrearSubcategoriaComponent } from './pages/crear-subcategoria/crear-subcategoria.component';
import { ListarSubcategoriaComponent } from './pages/listar-subcategoria/listar-subcategoria.component';
import { LoginComponent } from './pages/login/login.component';
import { CrearCuentaComponent } from './pages/crear-cuenta/crear-cuenta.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { CrearMarcaComponent } from './pages/crear-marca/crear-marca.component';
import { CrearUbicacionComponent } from './pages/crear-ubicacion/crear-ubicacion.component';
import { ListarUbicacionComponent } from './pages/listar-ubicacion/listar-ubicacion.component';
import { ListarMarcaComponent } from './pages/listar-marca/listar-marca.component';
import { CrearCategoriaComponent } from './pages/crear-categoria/crear-categoria.component';
import { ListarCategoriaComponent } from './pages/listar-categoria/listar-categoria.component';
import { ListarProductosComponent } from './pages/listar-producto/listar-producto.component';
import { CrearProductoComponent } from './pages/crear-producto/crear-producto.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginRoutingModule } from './login-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { HeaderComponent } from './interfaces/header/header.component';
import { BreadcrumbsComponent } from './interfaces/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './interfaces/footer/footer.component';
import { ContactoComponent } from './interfaces/contacto/contacto.component';
import { ServiciosComponent } from './interfaces/servicios/servicios.component';
import { QuienessomosComponent } from './interfaces/quienessomos/quienessomos.component';
import { UbicacionComponent } from './interfaces/ubicacion/ubicacion.component';
import { PreguntasComponent } from './interfaces/preguntas/preguntas.component';
import { TerminosCondicionesComponent } from './interfaces/terminosCondiciones/terminosCondiciones.component';
import { PoliticaCookiesComponent } from './interfaces/politicaCookies/politicaCookies.component';
import { AvisoPrivacidadComponent } from './interfaces/avisoPrivacidad/avisoPrivacidad.component';
import { NotFoundComponent } from './interfaces/not-found/not-found.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { ServiciospublicoComponent } from './publico/serviciospublico/serviciospublico.component';
import { AdmonpreguntasComponent } from './admon/admonpreguntas/admonpreguntas.component';
import { AdmonusuariosComponent } from './admon/admonusuarios/admonusuarios.component';
import { HeaderadmonComponent } from './admon/headeradmon/headeradmon.component';
import { CrearCarruselComponent } from './pages/crear-carrusel/crear-carrusel.component';
import { ListarCarruselComponent } from './pages/listar-carrusel/listar-carrusel.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PagoComponent } from './pages/pago/pago.component';
import { PaypalButtonComponent } from './pages/paypal-button/paypal-button.component';
import { PagoService } from './services/pago.service'; 
import { CarritoService } from './services/carrito.service';
import { AuthService } from './services/auth.service';
import { ProductoDetallesComponent } from './pages/producto-detalles/producto-detalles.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';

//CAPTCHA//
import { NgxCaptchaModule } from 'ngx-captcha';
import { LoginService } from './services/login.service';
import { UbicacionpublicoComponent } from './publico/ubicacionpublico/ubicacionpublico.component';

@NgModule({
  declarations: [
    LoginComponent,
    CrearCuentaComponent,
    RecuperarPasswordComponent,
    LayoutComponent,
    InicioComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
    ContactoComponent,
    ServiciosComponent,
    QuienessomosComponent,
    UbicacionComponent,
    UbicacionpublicoComponent,
    AvisoPrivacidadComponent,
    PoliticaCookiesComponent,
    TerminosCondicionesComponent,
    PreguntasComponent,
    NotFoundComponent,
    PerfilComponent,
    EditarPerfilComponent,
    ServiciospublicoComponent,
    CarritoComponent,
    PagoComponent,
    PaypalButtonComponent,
    ProductoDetallesComponent,
    PaymentSuccessComponent,

    //admon
    HeaderadmonComponent,
    AdmonusuariosComponent,
    AdmonpreguntasComponent,
    ListarMarcaComponent,
    ListarUbicacionComponent,
    ListarProductosComponent,
    ListarCategoriaComponent,
    ListarSubcategoriaComponent,
    ListarCarruselComponent,
    CrearProductoComponent,
    CrearUbicacionComponent,
    CrearMarcaComponent,
    CrearCategoriaComponent,
    CrearSubcategoriaComponent,
    CrearCarruselComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    FormsModule,
    MatIconModule, // Asegúrate de importar MatIconModule aquí también
    RouterModule,
    GoogleMapsModule,
  ],
  providers: [LoginService,PagoService,CarritoService,AuthService ]
})
export class LoginModule { }
