import { Injectable } from '@angular/core';
import {WebRequestService} from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private  webRequestService:WebRequestService) { }

  getUsers(){
    return this.webRequestService.getUsers();
  }

  deleteUser(id:string){
    return this.webRequestService.deleteUser(id);

  }
}
