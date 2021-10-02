import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public  authService:AuthService) { }

  ngOnInit(): void {
  }
  /*onSignupButtonClick(email:string,password:string){
    console.log("in login page");
    this.authService.signup(email,password).subscribe((res:HttpResponse<any>)=>{
      if(res.status === 200){
        this.router.navigate(['/movies']);
      }
    });
  }*/


}
