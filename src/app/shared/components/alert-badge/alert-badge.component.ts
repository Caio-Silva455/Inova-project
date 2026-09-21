import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alerta } from '../../../core/models/alerta.model';

@Component({
  selector: 'app-alert-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-badge.component.html',
  styleUrl: './alert-badge.component.css',
})
export class AlertBadgeComponent {
  @Input({ required: true }) alerta!: Alerta;

  private descricoes: Record<string, string> = {
    queda: 'Possível queda detectada',
    frequencia_baixa: 'Frequência cardíaca baixa',
    frequencia_alta: 'Frequência cardíaca alta',
    fora_da_area: 'Saiu da área segura',
  };

  get descricao(): string {
    return this.descricoes[this.alerta.tipo] ?? this.alerta.tipo;
  }

  get dataExibicao(): string | undefined {
    return this.alerta.createdAt || this.alerta.timestamp;
  }
}
