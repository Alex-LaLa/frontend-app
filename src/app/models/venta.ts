export interface Venta {
  clienteId: number | null;

  productos: VentaProducto[];
}

export interface VentaProducto {
  productoId: number | null;

  cantidad: number;
}
