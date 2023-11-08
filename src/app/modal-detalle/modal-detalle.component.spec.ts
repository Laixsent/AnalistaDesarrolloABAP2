import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleComponent } from './modal-detalle.component';

describe('ModalDetalleComponent', () => {
  let component: ModalDetalleComponent;
  let fixture: ComponentFixture<ModalDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDetalleComponent]
    });
    fixture = TestBed.createComponent(ModalDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
