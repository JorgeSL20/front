import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; // Importa MatIconModule

import { RouterModule } from '@angular/router';


import { LoginComponent } from './pages/login/login.component';
import { CrearCuentaComponent } from './pages/crear-cuenta/crear-cuenta.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { CrearMarcaComponent } from './pages/crear-marca/crear-marca.component';
import { ListarMarcaComponent } from './pages/listar-marca/listar-marca.component';
import { CrearCategoriaComponent } from './pages/crear-categoria/crear-categoria.component';
import { ListarCategoriaComponent } from './pages/listar-categoria/listar-categoria.component';
import { ListarProductosComponent } from './pages/listar-producto/listar-producto.component';
import { CrearProductoComponent } from './pages/crear-producto/crear-producto.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginRoutingModule } from './login-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AgendarComponent } from './pages/agendar/agendar.component';
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
import { PreguntaspublicoComponent } from './publico/preguntaspublico/preguntaspublico.component';
import { AdmonpreguntasComponent } from './admon/admonpreguntas/admonpreguntas.component';
import { AdmonusuariosComponent } from './admon/admonusuarios/admonusuarios.component';
import { HeaderadmonComponent } from './admon/headeradmon/headeradmon.component';
import { CrearCarruselComponent } from './pages/crear-carrusel/crear-carrusel.component';
import { ListarCarruselComponent } from './pages/listar-carrusel/listar-carrusel.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PagoComponent } from './pages/pago/pago.component';
import { PaypalButtonComponent } from './pages/paypal-button/paypal-button.component';
import { PagoService } from './services/pago.service'; // Importar el nuevo servicio
import { CarritoService } from './services/carrito.service';
import { AuthService } from './services/auth.service';

//CAPTCHA//
import { NgxCaptchaModule } from 'ngx-captcha';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    LoginComponent,
    CrearCuentaComponent,
    ListarMarcaComponent,
    ListarProductosComponent,
    ListarCategoriaComponent,
    ListarCarruselComponent,
    CrearProductoComponent,
    CrearMarcaComponent,
    CrearCategoriaComponent,
    CrearCarruselComponent,
    RecuperarPasswordComponent,
    LayoutComponent,
    InicioComponent,
    AgendarComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
    ContactoComponent,
    ServiciosComponent,
    QuienessomosComponent,
    UbicacionComponent,
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
    

    //admon
    HeaderadmonComponent,
    AdmonusuariosComponent,
    AdmonpreguntasComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    FormsModule,
    MatIconModule, // Asegúrate de importar MatIconModule aquí también
    RouterModule
  ],
  providers: [LoginService,PagoService,CarritoService,AuthService ]
})
export class LoginModule { }
