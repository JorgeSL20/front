import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa este módulo si tu componente utiliza HttpClient
import { PagoComponent } from './pago.component';
import { HeaderComponent } from '../../interfaces/header/header.component';  // Asegúrate de importar el HeaderComponent si está en una ruta diferente

describe('PagoComponent', () => {
  let component: PagoComponent;
  let fixture: ComponentFixture<PagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa cualquier módulo necesario
      declarations: [PagoComponent, HeaderComponent] // Asegúrate de declarar el HeaderComponent aquí
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
