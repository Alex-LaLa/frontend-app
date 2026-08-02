import { ChangeDetectorRef, Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { ClienteService } from '../../services/cliente';
import { ClienteDialog } from '../cliente-dialog/cliente-dialog';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSort,
    MatLabel,
    MatFormField,
    MatInput,
    MatPaginator,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class ClientesComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;
  columnas: string[] = ['id', 'nombreCompleto', 'email', 'ciudad', 'acciones'];

  constructor(
    private clienteService: ClienteService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;
  }
  filtrar(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;

    this.dataSource.filter = valor.trim().toLowerCase();
  }
  cargarClientes(): void {
    this.clienteService.obtenerClientes().subscribe((data) => {
      this.dataSource.data = data;
      this.cdr.detectChanges();
    });
  }

  abrirDialogoCliente(): void {
    const dialogRef = this.dialog.open(ClienteDialog, {
      width: '500px',

      data: {
        nombreCompleto: '',
        email: '',
        ciudad: '',
      },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (!resultado) return;

      this.clienteService.crearCliente(resultado).subscribe(() => this.cargarClientes());
    });
  }

  editarCliente(cliente: any): void {
    const dialogRef = this.dialog.open(ClienteDialog, {
      width: '500px',

      data: { ...cliente },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (!resultado) return;

      this.clienteService
        .actualizarCliente(cliente.id, resultado)
        .subscribe(() => this.cargarClientes());
    });
  }

  eliminarCliente(cliente: any): void {
    if (!confirm(`¿Eliminar al cliente "${cliente.nombreCompleto}"?`)) {
      return;
    }

    this.clienteService.eliminarCliente(cliente.id).subscribe(() => this.cargarClientes());
  }
}
