import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { LoginGuard } from '../guard/login.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard', titleI18n: 'dashboard' },
      },
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then(mod => mod.ClientsModule),
        data: { title: 'Clients', titleI18n: 'Clients' }
      },
      {
        path: 'questions',
        loadChildren: () => import('./questions/questions.module').then(mod => mod.QuestionsModule),
        data: { title: 'Questions', titleI18n: 'Questions' }
      },
      {
        path: 'answers',
        loadChildren: () => import('./answers/answers.module').then(mod => mod.AnswersModule),
        data: { title: 'Answers', titleI18n: 'Answers' }
      },
      {
        path: 'sessions',
        loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Sessions', titleI18n: 'Sessions' },
      }
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login', titleI18n: 'Login' },
      },
      // {
      //   path: 'register',
      //   component: RegisterComponent,
      //   data: { title: 'Register', titleI18n: 'Register' },
      // },
    ],
  },
  {
    path: 'page',
    loadChildren: () => import('./sessions/sessions.module').then(mod => mod.SessionsModule)
  },
  { path: '**', redirectTo: 'page/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
