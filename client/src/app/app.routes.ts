import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunoListComponent } from './alunos/aluno-list/aluno-list.component';
import { AlunoComponent } from './alunos/aluno/aluno.component';
import { ProfessorListComponent } from './professores/professor-list/professor-list.component';
import { EscolaListComponent } from './escolas/escola-list/escola-list.component';
import { UsuarioListComponent } from './usuarios/usuario-list/usuario-list.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { UsuarioSenhaComponent } from './usuarios/usuario/usuario-senha.component';

const appRoutes: Routes = [
	{ path: '', redirectTo: 'alunos', pathMatch: 'full' },
	{ path: 'alunos', component: AlunoListComponent },
	{ path: 'alunos/aluno', component: AlunoComponent },
	{ path: 'alunos/aluno/:id', component: AlunoComponent },
	{ path: 'professores', component: ProfessorListComponent },
	{ path: 'professores/professor', component: ProfessorListComponent },
	{ path: 'professores/professor/:id', component: ProfessorListComponent },
	{ path: 'escolas', component: EscolaListComponent },
	{ path: 'usuarios', component: UsuarioListComponent },
	{ path: 'usuarios/usuario', component: UsuarioComponent },
	{ path: 'usuarios/usuario/:id', component: UsuarioComponent },
	{ path: 'usuarios/usuario-senha', component: UsuarioSenhaComponent },
	// { path: '**', redirectTo: 'alunos' }
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
