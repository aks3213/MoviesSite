import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {IMovie} from './../../models/Movie';
import {AuthService} from './../../services/auth.service';

import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-admin-movies',
  templateUrl: './admin-movies.component.html',
  styleUrls: ['./admin-movies.component.scss']
})
export class AdminMoviesComponent implements OnInit {

  movies:IMovie[];

  constructor(private  movieService:MoviesService,private authService:AuthService,private router:Router) { 
  }

  ngOnInit(): void {
    this.movieService.getMoviesAdmin().subscribe((data:IMovie[])=>{
      this.movies = data;
    }); 
  }

}
