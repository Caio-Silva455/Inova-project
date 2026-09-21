import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { Alerta } from '../models/alerta.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private alertasSubject = new BehaviorSubject<Alerta[]>([]);
  alertas$ = this.alertasSubject.asObservable();

  constructor(private ws: WebsocketService) {
    this.ws.alerta$.subscribe((alerta) => this.handleAlerta(alerta));
  }

  private handleAlerta(alerta: Alerta): void {
    const atual = this.alertasSubject.value;
    this.alertasSubject.next([alerta, ...atual].slice(0, 50));

    if (alerta.severidade === 'alta') {
      this.tocarSom();
      this.notificarNavegador(alerta);
    }
  }

  private tocarSom(): void {
    // Coloque um arquivo de som em src/assets/sounds/alerta.mp3
    const audio = new Audio('assets/sounds/alerta.mp3');
    audio.play().catch(() => {
      // navegador pode bloquear autoplay sem interação do usuário — ok ignorar
    });
  }

  private notificarNavegador(alerta: Alerta): void {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'granted') {
      new Notification('Alerta de emergência', {
        body: `Idoso #${alerta.idosoId}: ${this.descreverTipo(alerta.tipo)}`,
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }

  private descreverTipo(tipo: Alerta['tipo']): string {
    const descricoes: Record<Alerta['tipo'], string> = {
      queda: 'possível queda detectada',
      frequencia_baixa: 'frequência cardíaca baixa',
      frequencia_alta: 'frequência cardíaca alta',
      fora_da_area: 'saiu da área segura',
    };
    return descricoes[tipo] ?? tipo;
  }

  marcarComoLido(index: number): void {
    const atual = [...this.alertasSubject.value];
    atual.splice(index, 1);
    this.alertasSubject.next(atual);
  }
}
