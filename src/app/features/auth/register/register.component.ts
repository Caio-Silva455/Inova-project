import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  carregando = false;
  erro: string | null = null;
  sucesso = false;

  enviar(): void {
    if (this.form.invalid) return;

    this.carregando = true;
    this.erro = null;

    const dados = this.form.getRawValue() as { nome: string; email: string; senha: string };

    this.authService.registrar(dados).subscribe({
      next: () => {
        this.sucesso = true;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.erro = err.error?.erro || 'Não foi possível criar a conta';
        this.carregando = false;
      },
    });
  }
}