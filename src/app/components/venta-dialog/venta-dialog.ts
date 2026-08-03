import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ProductoService } from '../../services/producto';
import { ClienteService } from '../../services/cliente';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-venta-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIcon,
  ],
  templateUrl: './venta-dialog.html',
  styleUrl: './venta-dialog.css',
})
export class VentaDialog implements OnInit {
  clientes: any[] = [];
  productos: any[] = [];

  venta = {
    clienteId: null,
    productos: [
      {
        productoId: null,
        cantidad: 1,
      },
    ],
  };

  constructor(
    public dialogRef: MatDialogRef<VentaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clienteService: ClienteService,
    private productoService: ProductoService,
  ) {}

  ngOnInit(): void {
    this.clienteService.obtenerClientes().subscribe((c) => {
      this.clientes = c;
    });

    this.productoService.obtenerProductos().subscribe((p) => {
      this.productos = p;
    });
  }

  guardar() {
    this.dialogRef.close(this.venta);
  }

  cancelar() {
    this.dialogRef.close();
  }
  agregarProducto(): void {
    this.venta.productos.push({
      productoId: null,

      cantidad: 1,
    });
  }
  eliminarProducto(index: number): void {
    this.venta.productos.splice(index, 1);
  }
  obtenerPrecio(productoId: number): number {
    const producto = this.productos.find((p) => p.id === productoId);

    return producto ? producto.precio : 0;
  }
  obtenerTotal(): number {
    let total = 0;

    this.venta.productos.forEach((item) => {
      if (item.productoId != null) {
        total += this.obtenerPrecio(item.productoId) * item.cantidad;
      }
    });

    return total;
  }
}
