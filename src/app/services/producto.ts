import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CommonModule} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private api = `${environment.apiUrl}/api/productos`;

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  obtenerProducto(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  crearProducto(producto: any): Observable<any> {
    return this.http.post<any>(this.api, producto);
  }

  actualizarProducto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
