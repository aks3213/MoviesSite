import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router';
import {IMovie} from './../../models/Movie';

import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {

  public param:Params;
  private size:string;
  public movies:IMovie[];

  constructor(private route: ActivatedRoute,private movieService:MoviesService) {
    this.route.params.subscribe((params:Params)=>{
      this.param=params['size'];
      this.size=this.param.toString();
      console.log(this.size);
    });
   }

  ngOnInit(): void {
    this.movieService.getMovieBySize(this.size).subscribe((data:any)=>{
      this.movies = data;
    });
  }

}
