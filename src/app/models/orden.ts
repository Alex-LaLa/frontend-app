import { Cliente } from './cliente';

export interface Orden {
  id: number;

  cliente: Cliente;

  estado: string;

  motivoCancelacion?: string | null;

  fechaOrden: Date;

  total: number;
}
