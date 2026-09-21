export type Role = 'admin' | 'cuidador';

export interface Usuario {
  id: number | string ;
  nome: string;
  email: string;
  perfil: string;
  role: Role;
  createdAt: string;
}
