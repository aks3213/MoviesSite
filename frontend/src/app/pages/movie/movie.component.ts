import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';
import { IMovie } from 'src/app/models/Movie';

import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movie:IMovie;
  public param:Params;
  private id:string;
  urlImage:string[]=["assets\\images\\screenshots","assets\\images\\screenshots","assets\\images\\screenshots","assets\\images\\screenshots"];
  urlMovie:string="assets\\movies";

  constructor(private route: ActivatedRoute,private movieService:MoviesService) {
    this.route.params.subscribe((params:Params)=>{
      this.param=params['movieId'];
      this.id=this.param.toString();
      
    });
  }

  ngOnInit(): void {

    console.log("param out");
    let i;
    for(i=0;i<this.urlImage.length;i++){
      this.urlImage[i]=this.urlImage[i]+"\\"+this.id+"_"+i+".jpg";
      console.log(this.urlImage[i]);
    }
    this.movieService.getMovie(this.id).subscribe((data:IMovie)=>{
      this.movie = data;
      console.log(data);
    }); 

  }
}
