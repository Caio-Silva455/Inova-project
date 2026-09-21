import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface IdosoDetalhado {
  id: number;
  nome: string;
  idade: number;
  status: string;
  bateria: number;
  batimentos: number;
  temperatura: number;
  pressao: string;
  endereco: string;
  responsavelNome: string;
  responsavelTelefone: string;
  alertasRecentes: Array<{
    id: number;
    tipo: string;
    mensagem: string;
    dataHora: string;
  }>;
}

@Component({
  selector: 'app-idoso-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './idoso-detail.component.html',
  styleUrl: './idoso-detail.component.css'
})
export class IdosoDetailComponent implements OnInit {
  idoso: IdosoDetalhado | null = null;
  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.carregarDetalhes(+idParam);
    }
  }

  carregarDetalhes(id: number): void {
    // Simulação de carregamento da API
    setTimeout(() => {
      this.idoso = {
        id,
        nome: 'Geruza',
        idade: 78,
        status: 'Monitoramento Ativo',
        bateria: 85,
        batimentos: 72,
        temperatura: 36.5,
        pressao: '12x8',
        endereco: 'Rua das Flores, 123 - Centro',
        responsavelNome: 'Carlos Silva',
        responsavelTelefone: '(27) 99999-8888',
        alertasRecentes: [
          {
            id: 1,
            tipo: 'queda',
            mensagem: 'Possível queda detectada no quarto',
            dataHora: 'Ontem às 18:30'
          },
          {
            id: 2,
            tipo: 'bateria',
            mensagem: 'Bateria abaixo de 20%',
            dataHora: '15/09 às 10:14'
          }
        ]
      };
      this.carregando = false;
      this.cdr.detectChanges();
    }, 300);
  }
}