import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlertasService } from '../../../core/services/alertas.service';
import { Alerta } from '../../../core/models/alerta.model';

@Component({
  selector: 'app-alerta-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './alerta-detail.component.html',
  styleUrl: './alerta-detail.component.css',
})
export class AlertaDetailComponent implements OnInit {
  alerta: Alerta | null = null;
  carregando = true;
  idosoId!: number;

  constructor(private route: ActivatedRoute, private alertasService: AlertasService) {}

  ngOnInit(): void {
    this.idosoId = Number(this.route.snapshot.paramMap.get('idosoId'));
    const alertaId = Number(this.route.snapshot.paramMap.get('id'));

    // não existe endpoint de "um único alerta" no backend — busca a lista do
    // idoso e filtra localmente pelo id
    this.alertasService.listarPorIdoso(this.idosoId).subscribe({
      next: (alertas) => {
        this.alerta = alertas.find((a) => a.id === alertaId) ?? null;
        this.carregando = false;
      },
      error: () => (this.carregando = false),
    });
  }

  marcarComoLido(): void {
    if (!this.alerta) return;

    this.alertasService.marcarComoLido(this.alerta.id).subscribe(() => {
      this.alerta = { ...this.alerta!, lido: true };
    });
  }
}
