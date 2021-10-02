import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {IMovie} from './../../models/Movie';

import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.scss']
})
export class NewMovieComponent implements OnInit {

  constructor(private  movieService: MoviesService,private router: Router ) { }

  ngOnInit(): void {
  }

  createMovie(title:string,genre:string,details:string,size:string,quality:string){
    console.log("wtf is this before");
    return this.movieService.createMovie(title,genre,details,size,quality).subscribe((response: any) => {
      
      console.log("wtf is this in");
      console.log(response.data);
      //navigate to /lists/response._id
      
      this.router.navigate(['/admin/movies']);
    });
  }
}
