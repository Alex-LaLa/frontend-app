import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';

import { authGuard } from './guards/auth-guard';
import { VentasComponent } from './components/ventas/ventas';
import { ProductosComponent } from './components/productos/productos';
import { CategoriasComponent } from './components/categorias/categorias';
import { ClientesComponent } from './components/clientes/clientes';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [authGuard],
  },

  {
    path: 'categorias',
    component: CategoriasComponent,
    canActivate: [authGuard],
  },

  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [authGuard],
  },

  {
    path: 'ventas',
    component: VentasComponent,
    canActivate: [authGuard],
  },
];
