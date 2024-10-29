import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoDetallesComponent } from './producto-detalles.component';
import { CarritoService } from '../../services/carrito.service';
import { LoginService } from '../../services/login.service';
import { of } from 'rxjs';
import { Producto } from '../../interfaces/producto.interface';

describe('ProductoDetallesComponent', () => {
  let component: ProductoDetallesComponent;
  let fixture: ComponentFixture<ProductoDetallesComponent>;
  let carritoServiceStub: Partial<CarritoService>;
  let loginServiceStub: Partial<LoginService>;

  beforeEach(async () => {
    // Crea un stub para el CarritoService
    carritoServiceStub = {
      agregarOActualizarItem: jasmine.createSpy('agregarOActualizarItem').and.returnValue(of({}))
    };

    // Crea un stub para el LoginService
    loginServiceStub = {
      isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(of(true))
    };

    await TestBed.configureTestingModule({
      declarations: [ProductoDetallesComponent],
      providers: [
        { provide: CarritoService, useValue: carritoServiceStub },
        { provide: LoginService, useValue: loginServiceStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoDetallesComponent);
    component = fixture.componentInstance;
  
    // Proporciona un valor de prueba completo para `producto`
    component.producto = {
      id: 1,
      nombre: 'Producto de prueba',
      descripcion: 'Descripción del producto de prueba',
      precio: 100,
      existencias: 10,
      url: 'https://example.com/imagen.jpg',
      producto: 'Producto de prueba',
      categoria: 'Categoría de prueba',
      marca: 'Marca de prueba',
      cantidadMay: 5,        // Agrega este campo
      precioMen: 90,         // Agrega este campo
      precioMay: 80          // Agrega este campo
    } as Producto;
  
    fixture.detectChanges();
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add product to cart', () => {
    component.agregarAlCarrito(component.producto.id);

    expect(carritoServiceStub.agregarOActualizarItem).toHaveBeenCalledWith({
      productoId: component.producto.id,
      cantidad: 1
    });
  });

  it('should show alert on product add', () => {
    spyOn(component, 'showAlert');
    component.agregarAlCarrito(component.producto.id);

    expect(component.showAlert).toHaveBeenCalledWith('Producto agregado', 'alert-success');
  });

  it('should set isLoggedIn based on LoginService', () => {
    expect(component.isLoggedIn).toBe(true);
  });
});
