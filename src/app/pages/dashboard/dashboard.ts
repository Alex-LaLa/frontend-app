import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardResumen } from '../../models/dashboard-resumen';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { MarkdownComponent } from 'ngx-markdown';
import { DashboardService } from '../../services/dashboard';
import { AiService } from '../../services/ai';
import { AuthService } from '../../services/auth';
import { MatIcon } from '@angular/material/icon';

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
    MatIcon,
    RouterLink,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  pregunta = '';
  respuestaIA = '';
  cargando = false;

  totalProductos = 0;
  totalCategorias = 0;
  productosActivos = 0;
  valorInventario = 0;

  constructor(
    private router: Router,
    private aiService: AiService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private dashboardService: DashboardService,
  ) {}

  ngOnInit(): void {
    this.cargarResumen();
  }

  cargarResumen(): void {
    this.dashboardService.obtenerResumen().subscribe({
      next: (resumen: DashboardResumen) => {
        this.totalProductos = resumen.totalProductos;
        this.totalCategorias = resumen.totalCategorias;
        this.productosActivos = resumen.productosActivos;
        this.valorInventario = resumen.valorInventario;

        this.barChartData = {
          labels: resumen.categorias,
          datasets: [
            {
              label: 'Productos',
              data: resumen.cantidades,
            }
            ,

          ],
        };
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar el dashboard', err);
      },
    });
  }

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
    this.cdr.detectChanges();
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}
