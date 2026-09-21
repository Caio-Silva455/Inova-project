import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IdososService } from '../../../core/services/idosos.service';
import { Idoso } from '../../../core/models/idoso.model';

@Component({
  selector: 'app-idosos-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './idosos-list.component.html',
  styleUrl: './idosos-list.component.css'
})
export class IdososListComponent implements OnInit {
  idosos: Idoso[] = [];
  carregando = true;

  constructor(
    private idososService: IdososService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarIdosos();
  }

  carregarIdosos(): void {
    this.carregando = true;
    this.idososService.listar().subscribe({
      next: (resposta: any) => {
        const lista = Array.isArray(resposta) ? resposta : resposta?.data || [];
        this.idosos = lista;
        this.carregando = false; // Garante que sai do estado "Carregando..."
        this.cdr.detectChanges(); // Força a atualização da interface no Angular
      },
      error: (err) => {
        console.error('Erro ao carregar idosos:', err);
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }
}