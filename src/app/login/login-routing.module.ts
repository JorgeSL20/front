import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { CrearCuentaComponent } from './pages/crear-cuenta/crear-cuenta.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RecomendacionesComponent } from './pages/recomendaciones/recomendaciones.component';
import { HeaderComponent } from './interfaces/header/header.component';
import { FooterComponent } from './interfaces/footer/footer.component';
import { ContactoComponent } from './interfaces/contacto/contacto.component';
import { UbicacionComponent } from './interfaces/ubicacion/ubicacion.component';
import { QuienessomosComponent } from './interfaces/quienessomos/quienessomos.component';
import { AvisoPrivacidadComponent } from './interfaces/avisoPrivacidad/avisoPrivacidad.component';
import { TerminosCondicionesComponent } from './interfaces/terminosCondiciones/terminosCondiciones.component';
import { PoliticaCookiesComponent } from './interfaces/politicaCookies/politicaCookies.component';
import { NotFoundComponent } from './interfaces/not-found/not-found.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { canActivate } from './guards/guards.guard';
import { ServiciospublicoComponent } from './publico/serviciospublico/serviciospublico.component';
import { PreguntasComponent } from './interfaces/preguntas/preguntas.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PagoComponent } from './pages/pago/pago.component';
import { ProductoDetallesComponent } from './pages/producto-detalles/producto-detalles.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [canActivate], // Protege el acceso a las rutas para usuarios autenticados
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'mi-carrito', component: CarritoComponent },
      { path: 'pago', component: PagoComponent },
      { path: 'detalles', component: ProductoDetallesComponent },
      { path: 'header', component: HeaderComponent },
      { path: 'footer', component: FooterComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: 'productospublicos', component: ServiciospublicoComponent },
      { path: 'ubicacion', component: UbicacionComponent },
      { path: 'registro', component: CrearCuentaComponent },
      { path: 'recuperar-password', component: RecuperarPasswordComponent },
      { path: 'quienessomos', component: QuienessomosComponent },
      { path: 'avisoprivacidad', component: AvisoPrivacidadComponent },
      { path: 'terminoscondiciones', component: TerminosCondicionesComponent },
      { path: 'politicacookies', component: PoliticaCookiesComponent },
      { path: 'recomendaciones', component:RecomendacionesComponent},
      { path: 'preguntas', component: PreguntasComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'editarperfil', component: EditarPerfilComponent },
      { path: '**', component: NotFoundComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
