import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menus/menu/menu.component';

import {WebRequestService} from './services/web-request.service';
import { NewMovieComponent } from './pages/new-movie/new-movie.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { DeleteMovieComponent } from './pages/delete-movie/delete-movie.component';
import { EditMovieComponent } from './pages/edit-movie/edit-movie.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { WebReqInterceptor } from './services/web-req.interceptor';
import { SinguppageComponent } from './pages/singuppage/singuppage.component';
import { IndexComponent } from './pages/index/index.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { MovieComponent } from './pages/movie/movie.component';
import { AdminLoginComponent } from './adminpages/admin-login/admin-login.component';
import { UsersComponent } from './adminpages/users/users.component';
import { DeleteUserComponent } from './adminpages/delete-user/delete-user.component';
import { AdminMoviesComponent } from './adminpages/admin-movies/admin-movies.component';
import { HomeComponent } from './home/home.component';
import { GenreComponent } from './pages/genre/genre.component';
import { SizeComponent } from './pages/size/size.component';
import { QualityComponent } from './pages/quality/quality.component';
import { PdfmakerComponent } from './pdfmaker/pdfmaker.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NewMovieComponent,
    MoviesComponent,
    DeleteMovieComponent,
    EditMovieComponent,
    LoginpageComponent,
    SinguppageComponent,
    IndexComponent,
    LogoutComponent,
    ContactusComponent,
    MovieComponent,
    AdminLoginComponent,
    UsersComponent,
    DeleteUserComponent,
    AdminMoviesComponent,
    HomeComponent,
    GenreComponent,
    SizeComponent,
    QualityComponent,
    PdfmakerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    WebRequestService,
    {provide:HTTP_INTERCEPTORS,useClass:WebReqInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
