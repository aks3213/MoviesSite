import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router';
import {IMovie} from './../../models/Movie';

import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})
export class QualityComponent implements OnInit {

  public param:Params;
  private quality:string;
  public movies:IMovie[];

  constructor(private route: ActivatedRoute,private movieService:MoviesService) {
    this.route.params.subscribe((params:Params)=>{
      this.param=params['quality'];
      this.quality=this.param.toString();
    });
   }

  ngOnInit(): void {
    this.movieService.getMovieByQuality(this.quality).subscribe((data:any)=>{
      this.movies = data;
    });
  }

}
