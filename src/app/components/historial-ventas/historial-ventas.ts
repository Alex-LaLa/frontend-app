import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { DetalleVentaDialog } from '../detalle-venta-dialog/detalle-venta-dialog';
import { OrdenService } from '../../services/orden';

import { Orden } from '../../models/orden';

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
  ordenes: Orden[] = [];

  columnas: string[] = ['id', 'cliente', 'fecha', 'estado', 'total', 'acciones'];

  constructor(
    private ordenService: OrdenService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes(): void {
    this.ordenService.obtenerOrdenes().subscribe({
      next: (ordenes: Orden[]) => {
        console.log('Órdenes recibidas:', ordenes);

        this.ordenes = ordenes;

        // fuerza actualización de la vista
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error cargando órdenes', error);
      },
    });
  }

  verDetalle(orden: Orden): void {
    this.dialog.open(DetalleVentaDialog, {
      width: '800px',

      data: orden,
    });
  }
}
