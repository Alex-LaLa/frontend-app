import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import { DetalleOrdenService } from '../../services/detalle-orden';

@Component({
  selector: 'app-detalle-venta-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTableModule, MatCardModule],
  templateUrl: './detalle-venta-dialog.html',
  styleUrl: './detalle-venta-dialog.css',
})
export class DetalleVentaDialog implements OnInit {
  detalles: any[] = [];

  columnas = ['producto', 'cantidad', 'precio', 'subtotal'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public venta: any,
    private detalleService: DetalleOrdenService,
  ) {}

  ngOnInit(): void {
    this.detalleService.obtenerPorOrden(this.venta.id).subscribe((data) => {
      this.detalles = data;
    });
  }
}
