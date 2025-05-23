import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'feed', component: MainComponent }, 
  {
    path: 'receta/:id',
    component: RecipeDetailComponent
  },
  { path: 'perfil/:id', component: ProfileComponent },
];
