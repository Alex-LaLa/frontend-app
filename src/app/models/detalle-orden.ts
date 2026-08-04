import { Producto } from './producto';

export interface DetalleOrden {
  id: number;

  producto: Producto;

  cantidad: number;

  precioUnitario: number;

  subtotal: number;
}
