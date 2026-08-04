import { Categoria } from './categoria';

export interface Producto {
  id: number;

  nombre: string;

  categoria: Categoria;

  precio: number;

  activo: boolean;
}
