import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVentaDialog } from './detalle-venta-dialog';

describe('DetalleVentaDialog', () => {
  let component: DetalleVentaDialog;
  let fixture: ComponentFixture<DetalleVentaDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleVentaDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleVentaDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
