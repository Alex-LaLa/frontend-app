import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';

import { ProductoService } from '../../services/producto';
import { ClienteService } from '../../services/cliente';

import { Cliente } from '../../models/cliente';
import { Producto } from '../../models/producto';
import { Venta, VentaProducto } from '../../models/venta';

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
  clientes: Cliente[] = [];

  productos: Producto[] = [];
  ventaInvalida = false;
  venta: Venta = {
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

    private clienteService: ClienteService,

    private productoService: ProductoService,
  ) {}

  ngOnInit(): void {
    this.clienteService.obtenerClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    });

    this.productoService.obtenerProductos().subscribe((productos: Producto[]) => {
      this.productos = productos;
    });

  }

  guardar(): void {
    if (!this.validarVenta()) {
      return;
    }

    this.dialogRef.close(this.venta);
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  agregarProducto(): void {
    const nuevoProducto: VentaProducto = {
      productoId: null,

      cantidad: 1,
    };

    this.venta.productos.push(nuevoProducto);
  }

  eliminarProducto(index: number): void {
    this.venta.productos.splice(index, 1);
  }

  obtenerPrecio(productoId: number | null): number {
    if (productoId === null) {
      return 0;
    }

    const producto = this.productos.find((p) => p.id === productoId);

    return producto ? producto.precio : 0;
  }

  obtenerTotal(): number {
    return this.venta.productos.reduce(
      (total, item) => {
        return total + this.obtenerPrecio(item.productoId) * item.cantidad;
      },

      0,
    );
  }

  private validarVenta(): boolean {
    this.ventaInvalida = false;

    if (this.venta.clienteId === null) {
      this.ventaInvalida = true;

      return false;
    }

    const productosValidos = this.venta.productos.every(
      (p) => p.productoId !== null && p.cantidad > 0,
    );

    if (!productosValidos) {
      this.ventaInvalida = true;

      return false;
    }

    return true;
  }
}
