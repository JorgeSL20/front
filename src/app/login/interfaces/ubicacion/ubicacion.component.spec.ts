import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { UbicacionComponent } from './ubicacion.component';
import { UbicacionService } from '../../services/ubicacion.service'; // Asegúrate de que la ruta sea correcta

describe('UbicacionComponent', () => {
  let component: UbicacionComponent;
  let fixture: ComponentFixture<UbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Agrega HttpClientModule aquí
      declarations: [UbicacionComponent],
      providers: [UbicacionService] // También asegúrate de proporcionar el servicio si lo usas
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
