import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Orden } from '../models/orden';

@Injectable({
  providedIn: 'root',
})
export class OrdenService {
  private api = `${environment.apiUrl}/api/ordenes`;

  constructor(private http: HttpClient) {}

  obtenerOrdenes(): Observable<Orden[]> {
    return this.http.get<Orden[]>(this.api);
  }
}
