import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './login/interfaces/not-found/not-found.component';
import { canActivate, canMatch } from './login/guards/guards.guard';
import { LoginComponent } from './login/pages/login/login.component';
import { ServiciosComponent } from './login/interfaces/servicios/servicios.component';
const routes: Routes = [
  //RUTAS DE NAVEGACIÓN
  {
    path: '',
    component: ServiciosComponent
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m=>m.LoginModule),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
