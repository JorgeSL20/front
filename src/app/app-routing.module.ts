import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosComponent } from './login/interfaces/servicios/servicios.component';
import { LoginComponent } from './login/pages/login/login.component';
import { NotFoundComponent } from './login/interfaces/not-found/not-found.component';
import { CrearCuentaComponent } from './login/pages/crear-cuenta/crear-cuenta.component'
import { RecuperarPasswordComponent } from './login/pages/recuperar-password/recuperar-password.component';
import { RoleGuard } from './login/guards/role.guard';

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
