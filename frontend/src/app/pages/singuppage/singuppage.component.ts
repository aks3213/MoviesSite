import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-singuppage',
  templateUrl: './singuppage.component.html',
  styleUrls: ['./singuppage.component.scss']
})
export class SinguppageComponent implements OnInit {

  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  

  onSignupButtonClick(email:string,password:string){
   // console.log("in signup page");
    this.authService.signup(email,password).subscribe((res:HttpResponse<any>)=>{
      if(res.status === 200){
        this.router.navigate(['/home']);
      }
    });
  }

}
