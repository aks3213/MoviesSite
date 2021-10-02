import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
   }

  get(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }
  getMoviesAdmin(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  getByGenre(uri: string,genre:string){
    return this.http.get(`${this.ROOT_URL}/${uri}/${genre}`);
  }
  getBySize(uri: string,size:string){
    return this.http.get(`${this.ROOT_URL}/${uri}/${size}`);
  }
  getByQuality(uri: string,quality:string){
    return this.http.get(`${this.ROOT_URL}/${uri}/${quality}`);
  }

  getMovie(uri:string,id:string){
    return this.http.get(`${this.ROOT_URL}/${uri}/${id}`);
  }

  post(uri: string, payload: object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string,id:string){
    return this.http.delete(`${this.ROOT_URL}/${uri}/${id}`);
  }
  
  patch(uri: string,id:string, payload: object){
    return this.http.patch(`${this.ROOT_URL}/${uri}/${id}`, payload,{responseType: 'text'});
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users/login`, {
      email,
      password
    }, {
        observe: 'response'
      });
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users`, {
      email,
      password,
      admin:'false'
    }, {
        observe: 'response'
      });
  }

  adminLogin(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/admins/login`, {
      email,
      password
    }, {
        observe: 'response'
      });
  }

  /////////////////////////////////////////////////////////////////////////

  getUsers(){
    return this.http.get(`${this.ROOT_URL}/users`);
  }

  deleteUser(id:string){
    return this.http.delete(`${this.ROOT_URL}/user/${id}`);
  }
}
