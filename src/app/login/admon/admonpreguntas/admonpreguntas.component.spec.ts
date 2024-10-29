import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { AdmonpreguntasComponent } from './admonpreguntas.component';
import { LoginService } from '../../services/login.service'; 

describe('AdmonpreguntasComponent', () => {
  let component: AdmonpreguntasComponent;
  let fixture: ComponentFixture<AdmonpreguntasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Agrega HttpClientModule aquí
      declarations: [AdmonpreguntasComponent],
      providers: [LoginService] // Asegúrate de incluir tu servicio
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmonpreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
