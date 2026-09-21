import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { Alerta } from '../models/alerta.model';
import { environment } from '../../../environments/environment';

// Instale antes: npm install socket.io-client
// Adicione em src/environments/environment.ts:  export const environment = { ..., wsUrl: 'http://localhost:3000' };

@Injectable({ providedIn: 'root' })
export class WebsocketService implements OnDestroy {
  private socket: Socket | null = null;

  private alertaSubject = new Subject<Alerta>();
  private connectedSubject = new Subject<boolean>();

  alerta$: Observable<Alerta> = this.alertaSubject.asObservable();
  connected$: Observable<boolean> = this.connectedSubject.asObservable();

  connect(token: string): void {
    if (this.socket?.connected) return;

    this.socket = io(environment.wsUrl, {
      auth: { token },
      transports: ['websocket'],
    });

    this.socket.on('connect', () => this.connectedSubject.next(true));
    this.socket.on('disconnect', () => this.connectedSubject.next(false));

    this.socket.on('alerta:novo', (alerta: Alerta) => this.alertaSubject.next(alerta));
    this.socket.on('alerta:global', (alerta: Alerta) => this.alertaSubject.next(alerta));
  }

  /** Assina os alertas de um idoso específico (ex: ao abrir a tela de detalhe) */
  subscribeIdoso(idosoId: number): void {
    this.socket?.emit('subscribe:idoso', idosoId);
  }

  unsubscribeIdoso(idosoId: number): void {
    this.socket?.emit('unsubscribe:idoso', idosoId);
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
