import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
  });

  carregando = false;
  erro: string | null = null;

  enviar(): void {
    if (this.form.invalid) return;

    this.carregando = true;
    this.erro = null;

    const { email, senha } = this.form.getRawValue();

    this.authService.login(email!, senha!).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.erro = err.error?.erro || 'Não foi possível fazer login';
        this.carregando = false;
      },
    });
  }
}