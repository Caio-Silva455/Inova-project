import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface UsuarioPerfil {
  nome: string;
  email: string;
  funcao: string;
  telefone: string;
  notificacoesEmail: boolean;
  notificacoesPush: boolean;
  notificacoesSms: boolean;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  usuario: UsuarioPerfil = {
    nome: 'Caio',
    email: 'caiosilvage05@gmail.com',
    funcao: 'Cuidador',
    telefone: '(27) 99999-7777',
    notificacoesEmail: true,
    notificacoesPush: true,
    notificacoesSms: false
  };

  editando = false;
  modalSenhaAberto = false;
  senhaAtual = '';
  novaSenha = '';

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  toggleEdicao(): void {
    this.editando = !this.editando;
  }

  salvarPerfil(): void {
    this.editando = false;
    // Aqui faria o chamada HTTP PUT para atualizar o perfil
  }

  abrirModalSenha(): void {
    this.modalSenhaAberto = true;
  }

  fecharModalSenha(): void {
    this.modalSenhaAberto = false;
    this.senhaAtual = '';
    this.novaSenha = '';
  }

  alterarSenha(): void {
    if (this.novaSenha.length >= 6) {
      alert('Senha alterada com sucesso!');
      this.fecharModalSenha();
    } else {
      alert('A nova senha deve ter pelo menos 6 caracteres.');
    }
  }

  sair(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}