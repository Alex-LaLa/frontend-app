import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaDialog } from './venta-dialog';

describe('VentaDialog', () => {
  let component: VentaDialog;
  let fixture: ComponentFixture<VentaDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(VentaDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
