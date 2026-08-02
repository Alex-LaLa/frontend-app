import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CategoriaService } from '../../services/categoria';
import { CategoriaDialog } from '../categoria-dialog/categoria-dialog';

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
  categorias: any[] = [];

  columnas: string[] = ['id', 'nombre', 'acciones'];

  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((data) => {
      this.categorias = data;
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
}
