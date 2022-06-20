import { Component, OnInit } from '@angular/core';
import {AllusersService} from "../../controller/service/allusers.service";
import {Router} from "@angular/router";
import {User} from "../../controller/model/user.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menu: any;
  user: User = new User();
  isLogged: boolean;



  constructor(private router: Router, private allusers: AllusersService) {
    router.events.subscribe((val) => {
      this.isLogged = Boolean(localStorage.getItem('isLogged'));
    });
  }


  ngOnInit() {}

  home() {
    this.router.navigateByUrl('/contact');
  }

  logoutUser() {
    this.allusers.logoutUser().subscribe((data) => {
      this.router.navigate(['/login']);
      localStorage.removeItem('isLogged');
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }


  onLogin():boolean{
    this.allusers.loginUser(this.user).subscribe((x: any) => {
      if(x===1){

      }else{

      }
    })
    return true;
  }
}

