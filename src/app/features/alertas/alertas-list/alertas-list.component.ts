import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Alerta {
  id: number;
  idosoId: number;
  idosoNome: string;
  tipo: 'queda' | 'bateria' | 'batimento' | 'sos';
  gravidade: 'alta' | 'media' | 'baixa';
  mensagem: string;
  dataHora: string;
  lido: boolean;
}

@Component({
  selector: 'app-alertas-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './alertas-list.component.html',
  styleUrl: './alertas-list.component.css'
})
export class AlertasListComponent implements OnInit {
  alertas: Alerta[] = [];
  alertasFiltrados: Alerta[] = [];
  filtroAtivo: 'todos' | 'criticos' | 'nao-lidos' = 'todos';
  carregando = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregarAlertas();
  }

  carregarAlertas(): void {
    this.carregando = true;
    setTimeout(() => {
      this.alertas = [
        {
          id: 1,
          idosoId: 1,
          idosoNome: 'Roberto',
          tipo: 'bateria',
          gravidade: 'media',
          mensagem: 'Bateria do dispositivo está abaixo de 15%',
          dataHora: 'Hoje às 10:14',
          lido: false
        },
        {
          id: 2,
          idosoId: 3,
          idosoNome: 'Geruza',
          tipo: 'queda',
          gravidade: 'alta',
          mensagem: 'Possível queda detectada no quarto',
          dataHora: 'Ontem às 18:30',
          lido: false
        },
        {
          id: 3,
          idosoId: 3,
          idosoNome: 'Geruza',
          tipo: 'batimento',
          gravidade: 'alta',
          mensagem: 'Batimentos cardíacos elevados (125 BPM)',
          dataHora: '18/09 às 14:20',
          lido: true
        }
      ];
      this.aplicarFiltro(this.filtroAtivo);
      this.carregando = false;
      this.cdr.detectChanges();
    }, 300);
  }

  aplicarFiltro(filtro: 'todos' | 'criticos' | 'nao-lidos'): void {
    this.filtroAtivo = filtro;
    if (filtro === 'criticos') {
      this.alertasFiltrados = this.alertas.filter(a => a.gravidade === 'alta');
    } else if (filtro === 'nao-lidos') {
      this.alertasFiltrados = this.alertas.filter(a => !a.lido);
    } else {
      this.alertasFiltrados = [...this.alertas];
    }
  }

  marcarComoLido(alerta: Alerta, event: Event): void {
    event.stopPropagation();
    alerta.lido = true;
    this.aplicarFiltro(this.filtroAtivo);
  }

  marcarTodosComoLidos(): void {
    this.alertas.forEach(a => a.lido = true);
    this.aplicarFiltro(this.filtroAtivo);
  }
}