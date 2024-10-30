import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesDocenteComponent } from './detalles-docente.component';

describe('DetallesDocenteComponent', () => {
  let component: DetallesDocenteComponent;
  let fixture: ComponentFixture<DetallesDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesDocenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
