import { ChartConfiguration } from 'chart.js';

export interface DashboardResumen {
  totalProductos: number;

  totalCategorias: number;

  productosActivos: number;

  valorInventario: number;

  categorias: string[];

  cantidades: number[];
}
