import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactoComponent } from './contacto.component';
import { HeaderComponent } from '../header/header.component';// Ajusta la ruta del archivo

describe('ContactoComponent', () => {
  let component: ContactoComponent;
  let fixture: ComponentFixture<ContactoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactoComponent, HeaderComponent] // Incluye AppHeaderComponent aquí
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
