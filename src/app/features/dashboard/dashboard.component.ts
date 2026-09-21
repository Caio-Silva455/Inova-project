import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { IdososService } from '../../core/services/idosos.service';
import { Idoso } from '../../core/models/idoso.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  nomeUsuario = 'Caio';
  idosos: Idoso[] = [];
  
  idosoParaEliminar: Idoso | null = null;
  exibirModalEliminar = false;

  resumo = {
    totalIdosos: 0,
    emAlerta: 0,
    bateriaBaixa: 0
  };

  private subscription: Subscription = new Subscription();

  constructor(
    private idososService: IdososService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarIdosos();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  carregarIdosos(): void {
    this.subscription.add(
      this.idososService.listar().subscribe({
        next: (lista: Idoso[]) => {
          this.idosos = lista;
          this.atualizarResumo();
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Erro ao carregar idosos:', err)
      })
    );
  }

  atualizarResumo(): void {
    this.resumo.totalIdosos = this.idosos.length;
    this.resumo.emAlerta = this.idosos.filter((i: any) => i.alertaAtivo || i.emAlerta).length;
    this.resumo.bateriaBaixa = this.idosos.filter((i: any) => i.bateria !== undefined && i.bateria <= 20).length;
  }

  abrirModalEliminar(idoso: Idoso, event: Event): void {
    event.stopPropagation();
    this.idosoParaEliminar = idoso;
    this.exibirModalEliminar = true;
  }

  fecharModalEliminar(): void {
    this.exibirModalEliminar = false;
    this.idosoParaEliminar = null;
  }

  confirmarEliminacao(): void {
    if (this.idosoParaEliminar?.id) {
      this.idososService.remover(this.idosoParaEliminar.id).subscribe({
        next: () => {
          this.fecharModalEliminar();
          this.carregarIdosos();
        },
        error: (err) => {
          console.error('Erro ao remover idoso:', err);
          this.fecharModalEliminar();
        }
      });
    }
  }
}