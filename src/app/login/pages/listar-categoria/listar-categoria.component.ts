import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css']
})
export class ListarCategoriaComponent implements OnInit {
  categoria: Categoria[] = [];

  constructor(private router: Router, @Inject(CategoriaService) private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.obtenerCategoria();
  }

  obtenerCategoria(): void {
    this.categoriaService.obtenerCategoria().subscribe(
      (categoria: Categoria[]) => {
        this.categoria = categoria;
        console.log(this.categoria); // Puedes hacer lo que necesites con los productos
      },
      (error) => {
        console.error('Error al obtener categoria:', error);
      }
    );
  }

  eliminarCategoria(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta categoria?')) {
      this.categoriaService.eliminarCategoria(id).subscribe(
        () => {
          console.log('Categoria eliminada correctamente');
          // Volver a cargar los productos después de eliminar
          this.obtenerCategoria();
        },
        (error) => {
          console.error('Error al eliminar categoria:', error);
        }
      );
    }
  }

  

  irAFormulario(): void {
    this.router.navigate(['/user/crear-categoria']);
  }
}
