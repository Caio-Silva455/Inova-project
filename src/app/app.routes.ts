import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'registrar',
    loadComponent: () =>
      import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
  },

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },

  {
    path: 'idosos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/idosos/idosos-list/idosos-list.component').then(
        (m) => m.IdososListComponent
      ),
  },
  {
    path: 'idosos/novo',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/idosos/idosos-form/idosos-form.component').then(
        (m) => m.IdososFormComponent
      ),
  },
  {
    path: 'idosos/:id/editar',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/idosos/idosos-form/idosos-form.component').then(
        (m) => m.IdososFormComponent
      ),
  },
  {
    path: 'idosos/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/idosos/idoso-detail/idoso-detail.component').then(
        (m) => m.IdosoDetailComponent
      ),
  },

  // Rota para a lista geral de alertas
  {
    path: 'alertas',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/alertas/alertas-list/alertas-list.component').then(
        (m) => m.AlertasListComponent
      ),
  },
  {
    path: 'alertas/:idosoId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/alertas/alertas-list/alertas-list.component').then(
        (m) => m.AlertasListComponent
      ),
  },
  {
    path: 'alertas/:idosoId/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/alertas/alerta-detail/alerta-detail.component').then(
        (m) => m.AlertaDetailComponent
      ),
  },

  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/admin/admin.component').then((m) => m.AdminComponent),
  },

  {
    path: 'perfil',
    canActivate: [authGuard],
    loadComponent: () => import('./features/user/user.component').then((m) => m.UserComponent),
  },

  { path: '**', redirectTo: 'login' },
];