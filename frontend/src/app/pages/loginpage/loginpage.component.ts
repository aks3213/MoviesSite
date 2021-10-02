import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {AuthService} from './../../services/auth.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {

  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  onLoginButtonClick(email:string,password:string){
    console.log("in login page");
    this.authService.login(email,password).subscribe((res:HttpResponse<any>)=>{
      if(res.status === 200){
        this.router.navigate(['/home']);
      }
    });
  }
}
