import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private api = `${environment.apiUrl}/api/categorias`;

  constructor(private http: HttpClient) {}

  obtenerCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  obtenerCategoria(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  crearCategoria(categoria: any): Observable<any> {
    return this.http.post<any>(this.api, categoria);
  }

  actualizarCategoria(id: number, categoria: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, categoria);
  }

  eliminarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
