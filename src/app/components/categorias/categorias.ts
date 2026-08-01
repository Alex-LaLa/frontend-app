import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CategoriaService } from '../../services/categoria';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class CategoriasComponent implements OnInit {
  categorias: any[] = [];

  columnas: string[] = ['id', 'nombre', 'acciones'];


  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }
}
