import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { VentaDialog } from '../venta-dialog/venta-dialog';
import { VentaService } from '../../services/venta';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css',
})
export class VentasComponent {
  constructor(
    private dialog: MatDialog,
    private ventaService: VentaService,
  ) {}

  abrirDialogoVenta(): void {
    const dialogRef = this.dialog.open(VentaDialog, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((venta) => {
      if (!venta) return;

      this.ventaService.registrarVenta(venta).subscribe({
        next: () => {
          alert('Venta registrada correctamente');
        },

        error: (err) => {
          console.error(err);

          alert('Error al registrar la venta');
        },
      });
    });
  }
}
