import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdososService } from '../../../core/services/idosos.service';

@Component({
  selector: 'app-idosos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './idosos-form.component.html',
  styleUrl: './idosos-form.component.css',
})
export class IdososFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private idososService = inject(IdososService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form = this.fb.group({
    nome: ['', Validators.required],
    dataNascimento: [''],
    endereco: [''],
  });

  modoEdicao = false;
  carregando = false;
  erro: string | null = null;

  private idosoId: number | null = null;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicao = true;
      this.idosoId = Number(idParam);
      this.carregarIdoso(this.idosoId);
    }
  }

  carregarIdoso(id: number): void {
    this.idososService.buscarPorId(id).subscribe((idoso) => {
      this.form.patchValue({
        nome: idoso.nome,
        dataNascimento: idoso.dataNascimento?.substring(0, 10) ?? '',
        endereco: idoso.endereco ?? '',
      });
    });
  }

  enviar(): void {
    if (this.form.invalid) return;

    this.carregando = true;
    this.erro = null;

    const dados = this.form.getRawValue() as {
      nome: string;
      dataNascimento: string;
      endereco: string;
    };

    const requisicao = this.modoEdicao
      ? this.idososService.atualizar(this.idosoId!, dados)
      : this.idososService.criar(dados);

    requisicao.subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.erro = err.error?.erro || 'Erro ao salvar idoso';
        this.carregando = false;
      },
    });
  }
}