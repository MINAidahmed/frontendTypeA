import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonneePro } from 'src/app/controller/model/donnee-pro.model';
import { AllusersService } from 'src/app/controller/service/allusers.service';
import { UserService } from 'src/app/controller/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-information-sur-demandeur',
  templateUrl: './information-sur-demandeur.component.html',
  styleUrls: ['./information-sur-demandeur.component.css'],
})
export class InformationSurDemandeurComponent implements OnInit {
  donne: DonneePro = new DonneePro();
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.userService.saveDonnesPro(this.donne).subscribe((data: any) => {
      if (data == -1) {
        Swal.fire(
          'Mise a jour données',
          'Vos données professionnels ont ete mise a jour',
          'success'
        );
      } else if (data == 1) {
        Swal.fire(
          'Ajout données',
          'Vos données professionnels ont ete ajouter',
          'success'
        );
      } else {
        Swal.fire(
          'Ajout données',
          'Veuillez verfiez que un ou plusieur champs sont pas vide',
          'error'
        );
      }
    });
  }
}
