import { ChartConfiguration } from 'chart.js';

export interface DashboardResumen {
  totalProductos: number;
  totalCategorias: number;
  productosActivos: number;
  valorInventario: number;
  barChartData: ChartConfiguration<'bar'>['data'];
}
