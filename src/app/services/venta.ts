import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private api = `${environment.apiUrl}/api/ventas`;

  constructor(private http: HttpClient) {}

  registrarVenta(venta: any): Observable<any> {
    return this.http.post(this.api, venta);
  }
}
