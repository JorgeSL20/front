// src/app/admin/admin-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { CrearCarruselComponent } from './pages/crear-carrusel/crear-carrusel.component';
import { ListarCarruselComponent } from './pages/listar-carrusel/listar-carrusel.component';
import { CrearMarcaComponent } from './pages/crear-marca/crear-marca.component';
import { ListarSubcategoriaComponent } from './pages/listar-subcategoria/listar-subcategoria.component';
import { CrearSubcategoriaComponent } from './pages/crear-subcategoria/crear-subcategoria.component';
import { CrearUbicacionComponent } from './pages/crear-ubicacion/crear-ubicacion.component';
import { ListarMarcaComponent } from './pages/listar-marca/listar-marca.component';
import { ListarUbicacionComponent } from './pages/listar-ubicacion/listar-ubicacion.component';
import { CrearCategoriaComponent } from './pages/crear-categoria/crear-categoria.component';
import { ListarCategoriaComponent } from './pages/listar-categoria/listar-categoria.component';
import { AdmonpreguntasComponent } from './admon/admonpreguntas/admonpreguntas.component';
import { AdmonusuariosComponent } from './admon/admonusuarios/admonusuarios.component';
import { InicioadminComponent } from './admon/inicioadmin/inicioadmin.component';
import { ListarProductosComponent } from './pages/listar-producto/listar-producto.component';
import { canActivate } from './guards/guards.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [canActivate], // Protege el acceso a todo el módulo de administración
    children: [
      { path: 'inicioadmin', component: InicioadminComponent },
      { path: 'crear-carrusel', component: CrearCarruselComponent },
      { path: 'listar-carrusel', component: ListarCarruselComponent },
      { path: 'crear-marca', component: CrearMarcaComponent },
      { path: 'crear-ubicacion', component: CrearUbicacionComponent },
      { path: 'crear-categoria', component: CrearCategoriaComponent },
      { path: 'crear-subcategoria', component: CrearSubcategoriaComponent },
      { path: 'listar-marca', component: ListarMarcaComponent },
      { path: 'listar-ubicacion', component: ListarUbicacionComponent },
      { path: 'listar-categoria', component: ListarCategoriaComponent },
      { path: 'listar-subcategoria', component: ListarSubcategoriaComponent },
      { path: 'adminusuarios', component: AdmonusuariosComponent },
      { path: 'adminpreguntas', component: AdmonpreguntasComponent },
      { path: 'listar-producto', component: ListarProductosComponent },
      { path: '', redirectTo: 'adminusuarios', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
