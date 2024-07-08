/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UbicacionpublicoComponent } from './ubicacionpublico.component';

describe('UbicacionpublicoComponent', () => {
  let component: UbicacionpublicoComponent;
  let fixture: ComponentFixture<UbicacionpublicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicacionpublicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionpublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
