import { Routes } from '@angular/router';
import {LoginComponent} from './features/auth/login/login.component';
import {PageListeAnnoncesComponent} from './features/annonce/page-liste-annonces/page-liste-annonces.component';
import {PageAnnonceDetailsComponent} from './features/annonce/page-annonce-details/page-annonce-details.component';
import {CreerAnnonceComponent} from './features/annonce/creer-annonce/creer-annonce.component';

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'annonces', component: PageListeAnnoncesComponent},
  {path: 'annonces/:id', component: PageAnnonceDetailsComponent },
  {path: 'creer-annonce', component: CreerAnnonceComponent }
];
