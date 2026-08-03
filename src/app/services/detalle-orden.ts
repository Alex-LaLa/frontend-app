import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DetalleOrdenService {
  private api = `${environment.apiUrl}/api/detalle-orden`;

  constructor(private http: HttpClient) {}

  obtenerPorOrden(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/orden/${id}`);
  }
}
