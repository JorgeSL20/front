import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooderadmonComponent } from './fooderadmon.component';

describe('FooderadmonComponent', () => {
  let component: FooderadmonComponent;
  let fixture: ComponentFixture<FooderadmonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooderadmonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooderadmonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
