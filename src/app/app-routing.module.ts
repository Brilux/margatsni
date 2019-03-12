import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { MainGuard } from './main/main.guard';
import { NonFoundComponent } from './auth/non-found/non-found.component';


const routes: Routes = [
  { path: '', loadChildren: './main/main.module#MainModule', canActivate: [MainGuard] },
  { path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'non-found', component: NonFoundComponent },
  { path: '**', redirectTo: 'non-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
