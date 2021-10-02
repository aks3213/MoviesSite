import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';

import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {

  public param:Params;

  constructor(private  movieService:MoviesService,private route:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.param=params['movieId'];
    });
  }

  editMovie(title:string,genre:string,details:string,size:string,quality:string){
    console.log("this is param : ", this.param.toString());
    return this.movieService.editMovie(this.param.toString(),title,genre,details,size,quality).subscribe((response: any) => {
      console.log(response.data);
      //navigate to /lists/response._id
      
    this.router.navigate(['/movies']);
    });
  }

}
