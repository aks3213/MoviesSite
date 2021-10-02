import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './pages/movies/movies.component';
import {NewMovieComponent} from './pages/new-movie/new-movie.component';
import {DeleteMovieComponent} from './pages/delete-movie/delete-movie.component';
import {EditMovieComponent} from './pages/edit-movie/edit-movie.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import {SinguppageComponent} from './pages/singuppage/singuppage.component';
import {LogoutComponent } from './pages/logout/logout.component';
import { IndexComponent } from './pages/index/index.component';
import {ContactusComponent} from './pages/contactus/contactus.component';
import { GenreComponent } from './pages/genre/genre.component';
import {SizeComponent} from './pages/size/size.component';
import {QualityComponent} from './pages/quality/quality.component';

import {HomeComponent} from './home/home.component';

import {AdminLoginComponent} from './adminpages/admin-login/admin-login.component';
import { AdminMoviesComponent } from './adminpages/admin-movies/admin-movies.component';
import {UsersComponent} from './adminpages/users/users.component';
import {DeleteUserComponent} from './adminpages/delete-user/delete-user.component';
import {MovieComponent} from './pages/movie/movie.component';
import { PdfmakerComponent } from './pdfmaker/pdfmaker.component';

const routes: Routes = [
  {path: '', redirectTo:'index',pathMatch:'full'},
  {path: 'index' , component: IndexComponent},
  {path: 'new-movie' , component: NewMovieComponent},
  {path:'movies', component: MoviesComponent},
  {path:'delete-movie/:movieId',component:DeleteMovieComponent},
  {path:'edit-movie/:movieId',component:EditMovieComponent},
  {path:'login' , component:LoginpageComponent},
  {path:'signup' , component:SinguppageComponent},
  {path:'logout' , component:LogoutComponent},
  {path:'contactus' , component:ContactusComponent},
  {path:'movie/:movieId',component:MovieComponent},
  {path:'genre/:genre',component:GenreComponent},
  {path:'size/:size',component:SizeComponent},
  {path:'quality/:quality',component:QualityComponent},

  {path:'home' , component:HomeComponent},

  {path:'admin/login',component:AdminLoginComponent},
  {path:'admin/movies',component:AdminMoviesComponent},
  {path:'admin/users',component:UsersComponent},
  {path:'admin/delete-user/:userId',component:DeleteUserComponent},
  {path:'pdf',component:PdfmakerComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
