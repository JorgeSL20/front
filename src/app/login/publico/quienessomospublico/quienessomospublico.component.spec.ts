/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuienessomospublicoComponent } from './quienessomospublico.component';

describe('QuienessomospublicoComponent', () => {
  let component: QuienessomospublicoComponent;
  let fixture: ComponentFixture<QuienessomospublicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuienessomospublicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuienessomospublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
