import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa el módulo de pruebas de HttpClient
import { PerfilComponent } from './perfil.component';
import { LoginService } from '../../services/login.service';  // Asegúrate de importar tu servicio de login si es necesario

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Agrega el módulo de pruebas aquí
      declarations: [PerfilComponent],
      providers: [LoginService] // Asegúrate de proporcionar tu servicio si lo necesitas
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
