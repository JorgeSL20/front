import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
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
import { HeaderadmonComponent } from './admon/headeradmon/headeradmon.component';
import { InicioadminComponent } from './admon/inicioadmin/inicioadmin.component';
import { FooderadmonComponent } from './admon/fooderadmon/fooderadmon.component';
import { CrearProductoComponent } from './pages/crear-producto/crear-producto.component';
import { ListarProductosComponent } from './pages/listar-producto/listar-producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from '../pipes/safe.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CrearCarruselComponent,
    ListarCarruselComponent,
    CrearMarcaComponent,
    ListarSubcategoriaComponent,
    CrearSubcategoriaComponent,
    CrearUbicacionComponent,
    ListarMarcaComponent,
    ListarUbicacionComponent,
    CrearCategoriaComponent,
    ListarCategoriaComponent,
    AdmonpreguntasComponent,
    AdmonusuariosComponent,
    HeaderadmonComponent,
    InicioadminComponent,
    FooderadmonComponent,
    CrearProductoComponent,
    ListarProductosComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
