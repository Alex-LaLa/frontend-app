import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiService {

  private apiUrl = `${environment.apiUrl}/api/ai`;

  constructor(private http: HttpClient) {}

  consultar(pregunta: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      pregunta: pregunta,
    });
  }
}
