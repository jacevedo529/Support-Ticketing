import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // TODO: Add home page
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  // Authentication
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // Support
  {
    path: 'support',
    canActivate: [AuthGuard],
    loadChildren: () => import('./support/support.module').then(m => m.SupportModule)
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
