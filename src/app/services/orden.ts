import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdenService {
  private api = `${environment.apiUrl}/api/ordenes`;

  constructor(private http: HttpClient) {}

  obtenerOrdenes(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }
}
