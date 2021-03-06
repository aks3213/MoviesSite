import { Component, OnInit } from '@angular/core';

import {IUser} from './../../models/User';


import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users:IUser[];


  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data:IUser[])=>{
      this.users = data;
    });
  }

}
