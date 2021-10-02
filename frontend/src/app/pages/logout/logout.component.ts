import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/index']);
    /*console.log("in login page");
    this.authService.signup(email,password).subscribe((res:HttpResponse<any>)=>{
      if(res.status === 200){
        this.router.navigate(['/movies']);
      }
    });*/
  }
}
