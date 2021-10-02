import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router';
import {IMovie} from './../../models/Movie';

import {Router, NavigationExtras} from "@angular/router";

import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies:IMovie[];
  imageUrl: string[]=[];
  size:number;

  constructor(private  movieService:MoviesService,private router:Router/*,private route:ActivatedRoute*/) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data:IMovie[])=>{
      this.movies = data;
      this.size = this.movies.length;
      console.log(this.movies.length)

      var i:number =0;
      for(i=0;i<this.size;i++){
        this.imageUrl[i]="assets\\images\\thumbnail\\"+this.movies[i]._id+".jpg";
        console.log(this.imageUrl[i] , " hello"  );
      }
    }); 
  }
}
