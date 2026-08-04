import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { HistorialVentasComponent } from '../historial-ventas/historial-ventas';
import { VentaDialog } from '../venta-dialog/venta-dialog';
import { VentaService } from '../../services/venta';

import { Venta } from '../../models/venta';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, HistorialVentasComponent],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css',
})
export class VentasComponent {
  @ViewChild(HistorialVentasComponent)
  historialComponent!: HistorialVentasComponent;

  constructor(
    private dialog: MatDialog,
    private ventaService: VentaService,
  ) {}

  abrirDialogoVenta(): void {
    const dialogRef = this.dialog.open(VentaDialog, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((venta: Venta | undefined) => {
      if (!venta) {
        return;
      }

      this.ventaService.registrarVenta(venta).subscribe({
        next: (mensaje) => {
          alert(mensaje);

          if (this.historialComponent) {
            this.historialComponent.cargarOrdenes();
          }
        },

        error: (err) => {
          console.error(err);

          alert('Error al registrar la venta');
        },
      });
    });
  }
}
