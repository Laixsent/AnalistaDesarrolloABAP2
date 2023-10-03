import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarUnisComponent } from './registrar-unis.component';

describe('RegistrarUnisComponent', () => {
  let component: RegistrarUnisComponent;
  let fixture: ComponentFixture<RegistrarUnisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarUnisComponent]
    });
    fixture = TestBed.createComponent(RegistrarUnisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
