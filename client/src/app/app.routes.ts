import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioLoginPaneComponent } from './usuarios/usuario-login-pane/usuario-login-pane.component';
import { AlunoListComponent } from './alunos/aluno-list/aluno-list.component';
import { AlunoComponent } from './alunos/aluno/aluno.component';
import { ProfessorListComponent } from './professores/professor-list/professor-list.component';
import { ProfessorComponent } from './professores/professor/professor.component';
import { EscolaListComponent } from './escolas/escola-list/escola-list.component';
import { EscolaComponent } from './escolas/escola/escola.component';
import { UsuarioListComponent } from './usuarios/usuario-list/usuario-list.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { UsuarioProfileComponent } from './usuarios/usuario-profile/usuario-profile.component';
import { UsuarioPasswordComponent } from './usuarios/usuario-password/usuario-password.component';

import { LoginGuardService } from './login-guard.service';
import { AuthGuardService } from './auth-guard.service';

const appRoutes: Routes = [
	{ path: '', redirectTo: 'alunos', pathMatch: 'full' },
	{ path: 'login', component: UsuarioLoginPaneComponent, canActivate: [LoginGuardService] },
	{ path: 'alunos', component: AlunoListComponent, canActivate: [AuthGuardService] },
	{ path: 'alunos/aluno', component: AlunoComponent, canActivate: [AuthGuardService] },
	{ path: 'alunos/aluno/:id', component: AlunoComponent, canActivate: [AuthGuardService] },
	{ path: 'professores', component: ProfessorListComponent, canActivate: [AuthGuardService] },
	{ path: 'professores/professor', component: ProfessorComponent, canActivate: [AuthGuardService] },
	{ path: 'professores/professor/:id', component: ProfessorComponent, canActivate: [AuthGuardService] },
	{ path: 'escolas', component: EscolaListComponent, canActivate: [AuthGuardService] },
	{ path: 'escolas/escola', component: EscolaComponent, canActivate: [AuthGuardService] },
	{ path: 'escolas/escola/:id', component: EscolaComponent, canActivate: [AuthGuardService] },
	{ path: 'usuarios', component: UsuarioListComponent, canActivate: [AuthGuardService] },
	{ path: 'usuarios/usuario', component: UsuarioComponent, canActivate: [AuthGuardService] },
	{ path: 'usuarios/usuario/:id', component: UsuarioComponent, canActivate: [AuthGuardService] },
	{ path: 'usuarios/usuario-profile', component: UsuarioProfileComponent, canActivate: [AuthGuardService] },
	{ path: 'usuarios/usuario-senha', component: UsuarioPasswordComponent, canActivate: [AuthGuardService] },
	// { path: '**', redirectTo: 'alunos' }
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
