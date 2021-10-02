import { Injectable } from '@angular/core';
import {WebRequestService} from './web-request.service';
import {IMovie} from './../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private  webRequestService:WebRequestService) { }

  /*createMovie(title:string,genre:string,size:string,quality:string,details:string,filepath:string,sspath1:string,sspath2:string,sspath3:string,sspath4:string){
    return this.webRequestService.post('movies', {title,genre,details,size,quality,filepath,sspath1,sspath2,sspath3,sspath4});
  }*/
  createMovie(title:string,genre:string,details:string,size:string,quality:string){
    return this.webRequestService.post('movies', {title,genre,details,size,quality});
  }
  getMoviesAdmin(){
    return this.webRequestService.getMoviesAdmin('admovies');
  }

  getMovies(){
    return this.webRequestService.get('movies');
  }
  getMovie(id:string){
    return this.webRequestService.getMovie('movies',id);
  }

  getMovieByGenre(genre:string){
    return this.webRequestService.getByGenre('genre',genre);
  }
  getMovieBySize(size:string){
    return this.webRequestService.getBySize('size',size);
  }
  getMovieByQuality(quality:string){
    return this.webRequestService.getByQuality('quality',quality);
  }

  deleteMovie(id:string){
    return this.webRequestService.delete('movies',id);
  }

  editMovie(id:string,title:string,genre:string,details:string,size:string,quality:string){
    console.log("Movie service");
    return this.webRequestService.patch('movies',id,{title,genre,details,size,quality});
  }
}
