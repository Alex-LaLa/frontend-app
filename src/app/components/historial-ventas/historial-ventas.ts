import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetalleVentaDialog } from '../detalle-venta-dialog/detalle-venta-dialog';
import { OrdenService } from '../../services/orden';

@Component({
  selector: 'app-historial-ventas',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './historial-ventas.html',
  styleUrl: './historial-ventas.css',
})
export class HistorialVentasComponent implements OnInit {
  ordenes: any[] = [];

  columnas = ['id', 'cliente', 'fecha', 'estado', 'total', 'acciones'];

  constructor(
    private ordenService: OrdenService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes() {
    this.ordenService.obtenerOrdenes().subscribe((data) => {
      this.ordenes = data;
    });
  }

  verDetalle(orden: any) {
    this.dialog.open(DetalleVentaDialog, {
      width: '800px',

      data: orden,
    });
  }
}
