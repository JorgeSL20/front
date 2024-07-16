import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCuentaComponent } from './pages/crear-cuenta/crear-cuenta.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { CrearCarruselComponent } from './pages/crear-carrusel/crear-carrusel.component';
import { ListarCarruselComponent } from './pages/listar-carrusel/listar-carrusel.component';
import { CrearMarcaComponent } from './pages/crear-marca/crear-marca.component';
import { ListarMarcaComponent } from './pages/listar-marca/listar-marca.component';
import { CrearCategoriaComponent } from './pages/crear-categoria/crear-categoria.component';
import { ListarCategoriaComponent } from './pages/listar-categoria/listar-categoria.component';
import { ListarProductosComponent } from './pages/listar-producto/listar-producto.component';
import { CrearProductoComponent } from './pages/crear-producto/crear-producto.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AgendarComponent } from './pages/agendar/agendar.component';
import { HeaderComponent } from './interfaces/header/header.component';
import { FooterComponent } from './interfaces/footer/footer.component';
import { ContactoComponent } from './interfaces/contacto/contacto.component';
import { ServiciosComponent } from './interfaces/servicios/servicios.component';
import { UbicacionComponent } from './interfaces/ubicacion/ubicacion.component';
import { QuienessomosComponent } from './interfaces/quienessomos/quienessomos.component';
import { AvisoPrivacidadComponent } from './interfaces/avisoPrivacidad/avisoPrivacidad.component';
import { TerminosCondicionesComponent } from './interfaces/terminosCondiciones/terminosCondiciones.component';
import { PoliticaCookiesComponent } from './interfaces/politicaCookies/politicaCookies.component';
import { PreguntasComponent } from './interfaces/preguntas/preguntas.component';
import { NotFoundComponent } from './interfaces/not-found/not-found.component'
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { canActivate, canMatch } from './guards/guards.guard';
import { ServiciospublicoComponent } from './publico/serviciospublico/serviciospublico.component';
import { PreguntaspublicoComponent } from './publico/preguntaspublico/preguntaspublico.component';
import { AdmonpreguntasComponent } from './admon/admonpreguntas/admonpreguntas.component';
//administrador
import { HeaderadmonComponent} from './admon/headeradmon/headeradmon.component';
import { AdmonusuariosComponent } from './admon/admonusuarios/admonusuarios.component';

const routes: Routes = [
  {
    path: 'user',
    component: LayoutComponent,
    children: [
      {
        path: 'inicio',
        component: InicioComponent,
        canActivate: [canActivate],
        canMatch: [canMatch]
      },
      {
        path: 'header',
        component: HeaderComponent,
        canActivate: [canActivate],
        canMatch: [canMatch]
      },
      {
        path: 'crear-producto',
        component: CrearProductoComponent
      },
      {
        path: 'crear-marca',
        component: CrearMarcaComponent
      },
      {
        path: 'crear-categoria',
        component: CrearCategoriaComponent
      },
      {
        path: 'crear-carrusel',
        component: CrearCarruselComponent
      },
      {
        path: 'listar-producto',
        component: ListarProductosComponent
      },
      {
        path: 'listar-marca',
        component: ListarMarcaComponent
      },
      {
        path: 'listar-categoria',
        component: ListarCategoriaComponent
      },
      {
        path: 'listar-carrusel',
        component: ListarCarruselComponent
      },
      {
        path: 'footer',
        component: FooterComponent,
        canActivate: [canActivate],
        canMatch: [canMatch]
      },
      {
        path: 'contacto',
        component: ContactoComponent
      },
      {
        path: 'productos',
        component: ServiciosComponent
      },
      {
        path: 'productospublicos',
        component: ServiciospublicoComponent,
        canActivate: [canActivate],
        canMatch: [canMatch]
      },
      {
        path: 'ubicacion',
        component: UbicacionComponent
      },

      {
        path: 'registro',
        component: CrearCuentaComponent
      },
      {
        path: 'recuperar-password',
        component: RecuperarPasswordComponent
      },
      {
        path: 'quienessomos',
        component: QuienessomosComponent
      },
      {
        path: 'avisoprivacidad', 
        component: AvisoPrivacidadComponent,
      },
      {
        path: 'terminoscondiciones', 
        component: TerminosCondicionesComponent,
      },
      {
        path: 'politicacookies', 
        component: PoliticaCookiesComponent,
      },
      {
        path: 'preguntas', component: PreguntasComponent,

      },
      {
        path: 'perfil', component: PerfilComponent,
        canActivate: [canActivate],
        canMatch:[canMatch]
      },
      {
        path: 'editarperfil', component: EditarPerfilComponent,
        canActivate: [canActivate],
        canMatch:[canMatch]
      },
      {
        path: 'login', component: LoginComponent

      },
      {
        path: 'preguntaspublico',
        component: PreguntaspublicoComponent
      },
      {
        path: 'adminusuarios',
        component: AdmonusuariosComponent ,
        canActivate: [canActivate],
        canMatch: [canMatch]
      },
      {
        path: 'adminpreguntas',
        component: AdmonpreguntasComponent ,
        canActivate: [canActivate],
        canMatch: [canMatch]
      },
      {
        path: '',
        component: NotFoundComponent
      },
      {
        path: '**',
        component: NotFoundComponent

      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
