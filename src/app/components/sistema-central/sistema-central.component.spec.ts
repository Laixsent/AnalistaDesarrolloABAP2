import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaCentralComponent } from './sistema-central.component';

describe('SistemaCentralComponent', () => {
  let component: SistemaCentralComponent;
  let fixture: ComponentFixture<SistemaCentralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SistemaCentralComponent]
    });
    fixture = TestBed.createComponent(SistemaCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
