import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Cadre } from 'src/app/controller/model/cadre.model';

import { MissionStage } from 'src/app/controller/model/mission-stage.model';
import { Soutien } from 'src/app/controller/model/soutien.model';
import { AllusersService } from 'src/app/controller/service/allusers.service';
import { UserService } from 'src/app/controller/service/user.service';
import Swal from 'sweetalert2';
import { documents } from '../../../controller/model/documents.model';

@Component({
  selector: 'app-postuler-mission',
  templateUrl: './postuler-mission.component.html',
  styleUrls: ['./postuler-mission.component.css'],
})
export class PostulerMissionComponent implements OnInit {
  selectedFile = {} as HTMLInputElement;
  selectedFileA = {} as HTMLInputElement;
  selectedFileB = {} as HTMLInputElement;
  selectedFileC = {} as HTMLInputElement;
  selectedFileD = {} as HTMLInputElement;
  selectedFileE = {} as HTMLInputElement;
  selectedFileF = {} as HTMLInputElement;

  file: any;
  fileUrl: any;
  mstage: MissionStage = new MissionStage();
  cadre: Cadre = new Cadre();
  soutien: Soutien = new Soutien();
  documents: documents = new documents();
  num: number;
  idm: number;

  constructor(
    private userService: UserService,
    private router: Router,
    private allusersService: AllusersService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (
      this.soutien.isBenfTypeA == 'oui' &&
      this.documents.fileF === undefined &&
      (this.soutien.montantderniersoutien === undefined ||
        this.soutien.datederniersoutien === undefined)
    ) {
      Swal.fire(
        'Ajout de manifestation',
        'Rapport ne peut pas etre vide si vous avez deja beinificez du soutien type A',
        'error'
      );
    } else {
      if (
        this.documents.filecin !== undefined ||
        this.documents.fileA !== undefined ||
        this.documents.fileB !== undefined ||
        this.documents.fileC !== undefined ||
        this.documents.fileD !== undefined ||
        this.documents.fileE !== undefined
      ) {
        /*  */
        let newDateDebut = new Date(this.mstage.dateDebut);
        let newDateFin = new Date(this.mstage.dateFin);
        let newDateDepart = new Date(this.mstage.dateDepart);
        let newDateRetour = new Date(this.mstage.dateRetour);
        if (
          newDateDebut.getTime() > newDateFin.getTime() ||
          newDateDepart.getTime() > newDateRetour.getTime()
        ) {
          Swal.fire(
            'Ajout de manifestation',
            'Veuillez verifiez les dates saisies (debut/fin/depart/retour)',
            'error'
          );
        } else {
          this.userService
            .addAll(this.mstage, this.cadre, this.soutien)
            .subscribe((x: any) => {
              if (x == '-1') {
                Swal.fire(
                  'Ajout de mission',
                  'Un ou plusieurs champs sont invalide',
                  'error'
                );
              } else if (x == '-2') {
                Swal.fire(
                  'Ajout de manifestation',
                  'Vous pouvez pas postuler sans remplir vos données professionnelles',
                  'error'
                );
              } else {
                if (this.userService.addFiles(x, this.documents) == null) {
                  Swal.fire(
                    'Ajout de mission',
                    'Veuillez remplire tous les fichier demander',
                    'error'
                  );
                } else {
                  this.userService
                    .addFiles(x, this.documents)
                    .subscribe((data) => {
                      (<HTMLInputElement>(
                        document.getElementById('impbtnS')
                      )).disabled = false;

                      Swal.fire(
                        'Ajout de mission',
                        'Ajout est fait avec succès',
                        'success'
                      );
                    });
                  this.idm = x;
                }
              }
            });
        }
      } else {
        Swal.fire(
          'Ajout de mission',
          'Veuillez remplire tous les fichier demander',
          'error'
        );
      }
    }
  }

  onFileSelected(event: Event) {
    let selectedFile = (<HTMLInputElement>event.target).files![0];
    this.documents.filecin = selectedFile;
    document.getElementById('cin').textContent =
      selectedFile.name.toUpperCase();
    document.getElementById('cin').style.color = 'red';
  }

  onFileSelectedA(event: Event) {
    let selectedFileA = (<HTMLInputElement>event.target).files![0];
    this.documents.fileA = selectedFileA;
    document.getElementById('doc1').textContent =
      selectedFileA.name.toUpperCase();
    document.getElementById('doc1').style.color = 'red';
  }

  onFileSelectedB(event: Event) {
    let selectedFileB = (<HTMLInputElement>event.target).files![0];
    this.documents.fileB = selectedFileB;
    document.getElementById('doc2').textContent =
      selectedFileB.name.toUpperCase();
    document.getElementById('doc2').style.color = 'red';
  }

  onFileSelectedC(event: Event) {
    let selectedFileC = (<HTMLInputElement>event.target).files![0];
    this.documents.fileC = selectedFileC;
    document.getElementById('doc3').textContent =
      selectedFileC.name.toUpperCase();
    document.getElementById('doc3').style.color = 'red';
  }

  onFileSelectedD(event: Event) {
    let selectedFileD = (<HTMLInputElement>event.target).files![0];
    this.documents.fileD = selectedFileD;
    document.getElementById('doc4').textContent =
      selectedFileD.name.toUpperCase();
    document.getElementById('doc4').style.color = 'red';
  }

  onFileSelectedE(event: Event) {
    let selectedFileE = (<HTMLInputElement>event.target).files![0];
    this.documents.fileE = selectedFileE;
    document.getElementById('doc5').textContent =
      selectedFileE.name.toUpperCase();
    document.getElementById('doc5').style.color = 'red';
  }
  onFileSelectedF(event: Event) {
    let selectedFileF = (<HTMLInputElement>event.target).files![0];
    this.documents.fileF = selectedFileF;
    document.getElementById('doc6').textContent =
      selectedFileF.name.toUpperCase();
    document.getElementById('doc6').style.color = 'red';
  }

  onSubmitt() {
    this.userService.exportReportMission(this.idm).subscribe((data: string) => {
      this.file = new Blob([data], { type: 'application/pdf' });
      this.fileUrl = URL.createObjectURL(this.file);
      window.open(this.fileUrl);
    });
  }

  show2() {
    document.getElementById('div1').style.display = 'block';
  }

  show1() {
    document.getElementById('div1').style.display = 'none';
  }
}
