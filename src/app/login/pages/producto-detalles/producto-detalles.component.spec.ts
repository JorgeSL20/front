import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDetallesComponent } from './producto-detalles.component';

describe('ProductoDetallesComponent', () => {
  let component: ProductoDetallesComponent;
  let fixture: ComponentFixture<ProductoDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoDetallesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductoDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
