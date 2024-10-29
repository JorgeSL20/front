import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisoPrivacidadComponent } from './avisoPrivacidad.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Importa CUSTOM_ELEMENTS_SCHEMA

describe('AvisoPrivacidadComponent', () => {
  let component: AvisoPrivacidadComponent;
  let fixture: ComponentFixture<AvisoPrivacidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoPrivacidadComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Agrega CUSTOM_ELEMENTS_SCHEMA aquí
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoPrivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
