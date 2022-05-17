import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ContactComponent } from '../contact/contact.component';
import { AllusersService } from '../../controller/service/allusers.service';
import { User } from '../../controller/model/user.model';
import { VarService } from 'src/app/controller/service/var.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menu: any;
  isLogged: boolean;

  constructor(
    private router: Router,
    private allusers: AllusersService,
    private varService: VarService
  ) {}

  user: User = new User();
  isloggedin: boolean;

  ngOnInit() {}

  home() {
    this.router.navigateByUrl('/contact');
  }

  logout() {
    this.allusers.logoutUser().subscribe((data) => {});
  }
}
