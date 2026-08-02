import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {

  private api = `${environment.apiUrl}/api/inventario`;

  constructor(private http: HttpClient) {}

  obtenerInventario(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  obtenerInventarioPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  crearInventario(inventario: any): Observable<any> {
    return this.http.post<any>(this.api, inventario);
  }

  actualizarInventario(id: number, inventario: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, inventario);
  }

  eliminarInventario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
