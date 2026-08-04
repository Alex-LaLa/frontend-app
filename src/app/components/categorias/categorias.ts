import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { CategoriaService } from '../../services/categoria';
import { CategoriaDialog } from '../categoria-dialog/categoria-dialog';
import { Categoria } from '../../models/categoria';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];

  columnas: string[] = ['id', 'nombre', 'acciones', 'activo'];

  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((data) => {
      this.categorias = data;
      this.cdr.detectChanges();
    });
  }

  abrirDialogoCategoria(): void {
    const dialogRef = this.dialog.open(CategoriaDialog, {
      width: '450px',

      data: {
        nombre: '',

        activo: true,
      },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (!resultado) {
        return;
      }

      this.categoriaService.crearCategoria(resultado).subscribe(() => {
        this.cargarCategorias();
      });
    });
  }

  editarCategoria(categoria: any): void {
    const dialogRef = this.dialog.open(CategoriaDialog, {
      width: '450px',

      data: { ...categoria },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (!resultado) {
        return;
      }

      this.categoriaService.actualizarCategoria(categoria.id, resultado).subscribe(() => {
        this.cargarCategorias();
      });
    });
  }

  eliminarCategoria(categoria: any): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',

      data: {
        tipo: 'categoría',
        nombre: categoria.nombre,
      },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (!resultado) {
        return;
      }

      this.categoriaService.eliminarCategoria(categoria.id).subscribe(() => {
        this.cargarCategorias();
      });
    });
  }
}
