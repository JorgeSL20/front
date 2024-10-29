import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PoliticaCookiesComponent } from './politicaCookies.component';
import { HeaderComponent } from '../header/header.component'; // Asegúrate de importar el HeaderComponent si está en una ruta diferente

describe('PoliticaCookiesComponent', () => {
  let component: PoliticaCookiesComponent;
  let fixture: ComponentFixture<PoliticaCookiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PoliticaCookiesComponent,
        HeaderComponent // Agrega el HeaderComponent aquí
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticaCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
