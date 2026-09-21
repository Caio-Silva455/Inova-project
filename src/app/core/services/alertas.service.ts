import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Alerta } from '../models/alerta.model';

@Injectable({ providedIn: 'root' })
export class AlertasService {
  private baseUrl = `${environment.apiUrl}/alertas`;

  constructor(private http: HttpClient) {}

  listarPorIdoso(idosoId: number): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(`${this.baseUrl}/idoso/${idosoId}`);
  }

  marcarComoLido(id: number): Observable<Alerta> {
    return this.http.patch<Alerta>(`${this.baseUrl}/${id}/lido`, {});
  }
}
