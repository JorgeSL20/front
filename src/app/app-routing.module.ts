import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosComponent } from './login/interfaces/servicios/servicios.component';
import { LoginComponent } from './login/pages/login/login.component';
import { NotFoundComponent } from './login/interfaces/not-found/not-found.component';
import { CrearCuentaComponent } from './login/pages/crear-cuenta/crear-cuenta.component'
import { RecuperarPasswordComponent } from './login/pages/recuperar-password/recuperar-password.component';
import { RoleGuard } from './login/guards/role.guard';
import { ContactoComponent } from './login/interfaces/contacto/contacto.component';
import { UbicacionComponent } from './login/interfaces/ubicacion/ubicacion.component';
import { QuienessomosComponent } from './login/interfaces/quienessomos/quienessomos.component';
import { AvisoPrivacidadComponent } from './login/interfaces/avisoPrivacidad/avisoPrivacidad.component';
import { TerminosCondicionesComponent } from './login/interfaces/terminosCondiciones/terminosCondiciones.component';
import { PoliticaCookiesComponent } from './login/interfaces/politicaCookies/politicaCookies.component';
import { PreguntasComponent } from './login/interfaces/preguntas/preguntas.component';

const routes: Routes = [
  {
    path: '',
    component: ServiciosComponent
  },
  {
    path: 'recuperar-password',
    component: RecuperarPasswordComponent
  },
  { 
    path: 'recuperar-password', 
    component: RecuperarPasswordComponent 
  },
  { path: 'contacto', component: ContactoComponent },
  { path: 'ubicacion', component: UbicacionComponent },
  { path: 'quienessomos', component: QuienessomosComponent },
  { path: 'avisoprivacidad', component: AvisoPrivacidadComponent },
  { path: 'terminoscondiciones', component: TerminosCondicionesComponent },
  { path: 'politicacookies', component: PoliticaCookiesComponent },
  { path: 'preguntas', component: PreguntasComponent },
  
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: CrearCuentaComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./login/admin.module').then(m => m.AdminModule),
    canActivate: [RoleGuard],  // Protege la ruta de admin con el RoleGuard
    canMatch: [RoleGuard],  // Protege también para el matching
  },
  {
    path: '**',
    component: NotFoundComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
