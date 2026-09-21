import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../models/usuario.model';

interface LoginResponse {
  token: string;
  usuario: Usuario;
}

const TOKEN_KEY = 'inova_token';
const USUARIO_KEY = 'inova_usuario';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // signal reativo — qualquer componente pode usar authService.usuarioAtual() no template
  usuarioAtual = signal<Usuario | null>(this.carregarUsuario());

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, senha: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, { email, senha })
      .pipe(
        tap((res) => {
          localStorage.setItem(TOKEN_KEY, res.token);
          localStorage.setItem(USUARIO_KEY, JSON.stringify(res.usuario));
          this.usuarioAtual.set(res.usuario);
        })
      );
  }

  registrar(dados: { nome: string; email: string; senha: string }): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.apiUrl}/auth/registrar`, dados);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USUARIO_KEY);
    this.usuarioAtual.set(null);
    this.router.navigate(['/login']);
  }

  obterToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  estaLogado(): boolean {
    return !!this.obterToken();
  }

  ehAdmin(): boolean {
    return this.usuarioAtual()?.role === 'admin';
  }

  private carregarUsuario(): Usuario | null {
    const bruto = localStorage.getItem(USUARIO_KEY);
    return bruto ? JSON.parse(bruto) : null;
  }
}
