import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooderadmonComponent } from './fooderadmon.component';

describe('FooderadmonComponent', () => {
  let component: FooderadmonComponent;
  let fixture: ComponentFixture<FooderadmonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooderadmonComponent]  // Cambia aquí: usa declarations en lugar de imports
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooderadmonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
