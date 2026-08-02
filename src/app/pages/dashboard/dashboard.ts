import { ChangeDetectorRef, Component} from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriasComponent } from '../../components/categorias/categorias';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardResumen } from '../../models/dashboard-resumen';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { MarkdownComponent } from 'ngx-markdown';

import { AiService } from '../../services/ai';
import { AuthService } from '../../services/auth';

import { ProductosComponent } from '../../components/productos/productos';
import { ClientesComponent } from '../../components/clientes/clientes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    BaseChartDirective,
    MarkdownComponent,
    CurrencyPipe,
    ProductosComponent,
    CategoriasComponent,
    ClientesComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  pregunta = '';
  respuestaIA = '';
  cargando = false;

  totalProductos = 0;
  totalCategorias = 0;
  productosActivos = 0;
  valorInventario = 0;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Productos',
        data: [],
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  constructor(
    private router: Router,
    private aiService: AiService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
  ) {}

  enviarPregunta(): void {
    if (!this.pregunta.trim()) {
      return;
    }

    this.cargando = true;
    this.respuestaIA = '';

    this.aiService.consultar(this.pregunta).subscribe({
      next: (res) => {
        this.respuestaIA = res.respuesta;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.respuestaIA = 'Ocurrió un error al consultar la IA.';
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  actualizarResumen(resumen: DashboardResumen): void {
    this.totalProductos = resumen.totalProductos;

    this.totalCategorias = resumen.totalCategorias;

    this.productosActivos = resumen.productosActivos;

    this.valorInventario = resumen.valorInventario;

    this.barChartData = resumen.barChartData;
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}
