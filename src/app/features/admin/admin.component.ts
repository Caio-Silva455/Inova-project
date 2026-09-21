import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService, Estatisticas, AlertaRecente } from '../../core/services/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  estatisticas: Estatisticas | null = null;
  alertasRecentes: AlertaRecente[] = [];
  carregando = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.obterEstatisticas().subscribe((stats) => (this.estatisticas = stats));

    this.adminService.alertasRecentes(20).subscribe({
      next: (alertas) => {
        this.alertasRecentes = alertas;
        this.carregando = false;
      },
      error: () => (this.carregando = false),
    });
  }
}
