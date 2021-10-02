import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';
import {UserService} from './../../services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  public param:Params;

  constructor(private  userService:UserService,private route:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.param=params['userId'];
    });
  }

  deleteUser(){
    console.log("this is param : ", this.param.toString());
    return this.userService.deleteUser(this.param.toString()).subscribe((response: any) => {
      console.log(response.data);
      //navigate to /lists/response._id
      
    this.router.navigate(['/admin/users']);
    });
  }

}
