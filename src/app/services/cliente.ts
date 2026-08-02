import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private api = `${environment.apiUrl}/api/clientes`;

  constructor(private http: HttpClient) {}

  obtenerClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  crearCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.api, cliente);
  }

  actualizarCliente(id: number, cliente: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, cliente);
  }

  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
