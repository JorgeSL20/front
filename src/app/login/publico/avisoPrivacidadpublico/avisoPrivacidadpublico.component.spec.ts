/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AvisoPrivacidadpublicoComponent } from './avisoPrivacidadpublico.component';

describe('AvisoPrivacidadpublicoComponent', () => {
  let component: AvisoPrivacidadpublicoComponent;
  let fixture: ComponentFixture<AvisoPrivacidadpublicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoPrivacidadpublicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoPrivacidadpublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
