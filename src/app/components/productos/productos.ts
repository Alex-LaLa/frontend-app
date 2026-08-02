import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ProductoService } from '../../services/producto';
import { CategoriaService } from '../../services/categoria';
import { InventarioService } from '../../services/inventario';

import { ProductoDialog } from '../producto-dialog/producto-dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { DashboardResumen } from '../../models/dashboard-resumen';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class ProductosComponent implements OnInit, AfterViewInit {
  @Output()
  resumenActualizado = new EventEmitter<DashboardResumen>();
  productos: any[] = [];
  categorias: any[] = [];
  inventarios: any[] = [];

  dataSource = new MatTableDataSource<any>();

  columnas = [
    'id',
    'nombre',
    'categoria',
    'precio',
    'cantidad',
    'estadoStock',
    'activo',
    'acciones',
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private inventarioService: InventarioService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    // ========= Proyecto =========

    this.cargarProductos();

    this.cargarCategorias();

    this.dataSource.filterPredicate = (data, filter) => {
      const texto = (data.nombre + ' ' + data.categoria?.nombre + ' ' + data.precio).toLowerCase();

      return texto.includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'categoria':
          return item.categoria?.nombre;

        default:
          return item[property];
      }
    };

    this.sort.active = 'id';
    this.sort.direction = 'asc';
  }
  cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe((productos) => {
      this.productos = productos;

      this.inventarioService.obtenerInventario().subscribe((inventarios) => {
        this.inventarios = inventarios;

        this.productos = productos.map((producto: any) => {
          const inventario = inventarios.find((i: any) => i.producto?.id === producto.id);

          return {
            ...producto,
            cantidad: inventario?.unidadesDisponibles ?? 0,
            nivelReorden: inventario?.nivelReorden ?? 0,
          };
        });
        this.productos.sort((a, b) => a.id - b.id);
        this.dataSource.data = this.productos;
        if (this.sort) {
          this.sort.active = 'id';
          this.sort.direction = 'asc';
        }
        const totalProductos = this.productos.length;
        const totalCategorias = new Set(this.productos.map((p: any) => p.categoria?.nombre)).size;
        const productosActivos = this.productos.filter((p: any) => p.activo).length;

        const valorInventario = this.productos.reduce(
          (total: number, p: any) => total + p.precio * p.cantidad,
          0,
        );
        const conteoCategorias: any = {};

        this.productos.forEach((producto: any) => {
          const categoria = producto.categoria?.nombre;

          if (categoria) {
            conteoCategorias[categoria] = (conteoCategorias[categoria] || 0) + 1;
          }
        });
        const barChartData: ChartConfiguration<'bar'>['data'] = {
          labels: Object.keys(conteoCategorias),
          datasets: [
            {
              label: 'Productos',
              data: Object.values(conteoCategorias) as number[],
            },
          ],
        };
        this.resumenActualizado.emit({
          totalProductos,
          totalCategorias,
          productosActivos,
          valorInventario,
          barChartData,
        });

        this.cdr.detectChanges();
      });
    });
  }

  filtrar(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  obtenerClaseStock(producto: any): string {
    if (producto.cantidad === 0) {
      return 'stock-agotado';
    }

    if (producto.cantidad <= producto.nivelReorden) {
      return 'stock-reordenar';
    }

    return 'stock-disponible';
  }

  obtenerEstadoStock(producto: any): string {
    if (producto.cantidad === 0) {
      return 'Agotado';
    }

    if (producto.cantidad <= producto.nivelReorden) {
      return 'Reordenar';
    }

    return 'Disponible';
  }

  abrirDialogoProducto(producto?: any): void {
    let inventario = null;

    if (producto) {
      inventario = this.inventarios.find((i: any) => i.producto?.id === producto.id);
    }

    const dialogRef = this.dialog.open(ProductoDialog, {
      width: '500px',

      data: {
        producto: producto
          ? { ...producto }
          : {
              nombre: '',
              categoria: null,
              precio: 0,
              activo: true,
            },

        inventario: inventario
          ? { ...inventario }
          : {
              unidadesDisponibles: 0,
              nivelReorden: 0,
            },

        categorias: this.categorias,
      },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (!resultado) {
        return;
      }

      if (resultado.producto.id) {
        this.actualizarProducto(resultado.producto, resultado.inventario);
      } else {
        this.crearProducto(resultado.producto, resultado.inventario);
      }
    });
  }

  crearProducto(producto: any, inventario: any): void {
    this.productoService.crearProducto(producto).subscribe({
      next: (productoCreado) => {
        const nuevoInventario = {
          producto: {
            id: productoCreado.id,
          },

          unidadesDisponibles: inventario.unidadesDisponibles,

          nivelReorden: inventario.nivelReorden,
        };

        this.inventarioService.crearInventario(nuevoInventario).subscribe({
          next: () => {
            this.cargarProductos();
          },

          error: (err) => {
            console.error('Error al crear inventario:', err);
          },
        });
      },

      error: (err) => {
        console.error('Error al crear producto:', err);
      },
    });
  }

  actualizarProducto(producto: any, inventario: any): void {
    this.productoService.actualizarProducto(producto.id, producto).subscribe({
      next: () => {
        if (!inventario?.id) {
          console.warn('El producto no tiene inventario asociado.');

          this.cargarProductos();

          return;
        }

        const inventarioActualizado = {
          producto: {
            id: producto.id,
          },

          unidadesDisponibles: inventario.unidadesDisponibles,

          nivelReorden: inventario.nivelReorden,
        };

        this.inventarioService
          .actualizarInventario(inventario.id, inventarioActualizado)
          .subscribe({
            next: () => {
              this.cargarProductos();
            },

            error: (err) => {
              console.error('Error al actualizar inventario:', err);
            },
          });
      },

      error: (err) => {
        console.error('Error al actualizar producto:', err);
      },
    });
  }

  eliminarProducto(producto: any): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',

      data: {
        nombre: producto.nombre,
      },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (!confirmado) {
        return;
      }

      const inventario = this.inventarios.find((i: any) => i.producto?.id === producto.id);

      // Primero eliminar inventario
      if (inventario) {
        this.inventarioService.eliminarInventario(inventario.id).subscribe({
          next: () => {
            this.eliminarProductoApi(producto.id);
          },

          error: (err) => {
            console.error('Error al eliminar inventario:', err);

            alert('No se pudo eliminar el inventario del producto.');
          },
        });
      } else {
        // Si no tiene inventario, eliminar directamente
        this.eliminarProductoApi(producto.id);
      }
    });
  }

  private eliminarProductoApi(id: number): void {
    this.productoService.eliminarProducto(id).subscribe({
      next: () => {
        this.cargarProductos();
      },

      error: (err) => {
        console.error('Error al eliminar producto:', err);

        alert('No se pudo eliminar el producto.');
      },
    });
  }
}
