import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { of } from 'rxjs'; // Importa 'of' para simular el comportamiento del Observable

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // Simula el objeto ActivatedRoute según tus necesidades
            params: of({}), // Simula los parámetros de la ruta
            snapshot: {
              params: {}
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
