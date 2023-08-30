import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleLibroBusquedaComponent } from './detalle-libro-busqueda.component';

describe('DetalleLibroBusquedaComponent', () => {
  let component: DetalleLibroBusquedaComponent;
  let fixture: ComponentFixture<DetalleLibroBusquedaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleLibroBusquedaComponent]
    });
    fixture = TestBed.createComponent(DetalleLibroBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
