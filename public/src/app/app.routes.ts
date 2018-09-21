import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunoComponent } from './alunos/aluno/aluno.component';
import { AlunoListComponent } from './alunos/aluno-list/aluno-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EscolaComponent } from './escolas/escola/escola.component';
import { EscolaListComponent } from './escolas/escola-list/escola-list.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfissionalComponent } from './profissionais/profissional/profissional.component';
import { ProfissionalListComponent } from './profissionais/profissional-list/profissional-list.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { UsuarioListComponent } from './usuarios/usuario-list/usuario-list.component';
import { UsuarioLoginPaneComponent } from './usuarios/usuario-login-pane/usuario-login-pane.component';
import { UsuarioPasswordComponent } from './usuarios/usuario-password/usuario-password.component';
import { UsuarioProfileComponent } from './usuarios/usuario-profile/usuario-profile.component';

import { AuthGuardService } from './auth-guard.service';
import { LoginGuardService } from './login-guard.service';


const routes: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full'  },
	{ path: 'login', component: UsuarioLoginPaneComponent, canActivate: [LoginGuardService] },
	{ path: 'login/:path', component: UsuarioLoginPaneComponent, canActivate: [LoginGuardService] },
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
	{ path: 'alunos', component: AlunoListComponent, canActivate: [AuthGuardService] },
	{ path: 'alunos/aluno', component: AlunoComponent, canActivate: [AuthGuardService] },
	{ path: 'alunos/aluno/:id', component: AlunoComponent, canActivate: [AuthGuardService] },
	{ path: 'profissionais', component: ProfissionalListComponent, canActivate: [AuthGuardService] },
	{ path: 'profissionais/profissional', component: ProfissionalComponent, canActivate: [AuthGuardService] },
	{ path: 'profissionais/profissional/:id', component: ProfissionalComponent, canActivate: [AuthGuardService] },
	{ path: 'escolas', component: EscolaListComponent, canActivate: [AuthGuardService] },
	{ path: 'escolas/escola', component: EscolaComponent, canActivate: [AuthGuardService] },
	{ path: 'escolas/escola/:id', component: EscolaComponent, canActivate: [AuthGuardService] },
	{ path: 'usuarios', component: UsuarioListComponent, canActivate: [AuthGuardService] },
	{ path: 'usuarios/usuario', component: UsuarioComponent, canActivate: [AuthGuardService] },
	{ path: 'usuarios/usuario/:id', component: UsuarioComponent, canActivate: [AuthGuardService] },
	{ path: 'usuario-profile', component: UsuarioProfileComponent, canActivate: [AuthGuardService] },
	{ path: 'usuario-senha', component: UsuarioPasswordComponent, canActivate: [AuthGuardService] },
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		scrollPositionRestoration: 'enabled',
		anchorScrolling: 'enabled'
	})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
