import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router';
import {IMovie} from './../../models/Movie';

import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  public param:Params;
  private genre:string;
  public movies:IMovie[];
  constructor(private route: ActivatedRoute,private movieService:MoviesService) { 
    this.route.params.subscribe((params:Params)=>{
      this.param=params['genre'];
      this.genre=this.param.toString();
    });
    
  }

  ngOnInit(): void {
    this.movieService.getMovieByGenre(this.genre).subscribe((data:any)=>{
      this.movies = data;
      console.log(data);
    });
  }

  onView(){
    this.movieService.getMovieByGenre(this.genre).subscribe((data:any)=>{
      this.movies = data;
      console.log(data);
    });
  }

}
