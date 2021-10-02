import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';

import { MoviesService } from 'src/app/services/movies.service';


@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.scss']
})
export class DeleteMovieComponent implements OnInit {

  public param:Params;

  constructor(private  movieService:MoviesService,private route:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.param=params['movieId'];
    });
  }

  deleteMovie(){
    console.log("this is param : ", this.param.toString());
    return this.movieService.deleteMovie(this.param.toString()).subscribe((response: any) => {
      console.log(response.data);
      //navigate to /lists/response._id
      
    this.router.navigate(['/admin/movies']);
    });
  }

}
