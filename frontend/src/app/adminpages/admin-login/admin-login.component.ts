import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpResponse } from '@angular/common/http';


import {AuthService} from './../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  onAdminLogin(email:string,password:string){
    console.log("in admin login page");
    this.authService.adminLogin(email,password).subscribe((res:HttpResponse<any>)=>{
      if(res.status === 200){
        this.router.navigate(['/home']);
      }
    });
  }
}
