import { Component, OnInit } from '@angular/core';
import { Cadre } from 'src/app/controller/model/cadre.model';
import { DonneePro } from 'src/app/controller/model/donnee-pro.model';
import { Manifestation } from 'src/app/controller/model/manifestation.model';
import { MissionStage } from 'src/app/controller/model/mission-stage.model';
import { Soutien } from 'src/app/controller/model/soutien.model';
import { User } from 'src/app/controller/model/user.model';
import { AdminService } from 'src/app/controller/service/admin.service';
import { UserService } from 'src/app/controller/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css'],
})
export class HistoriqueComponent implements OnInit {
  manifestations: Manifestation[];
  missionStages: MissionStage[];
  mStage: MissionStage = new MissionStage();
  manif: Manifestation = new Manifestation();
  user: User = new User();
  donnePro: DonneePro = new DonneePro();
  cadre: Cadre = new Cadre();
  soutien: Soutien = new Soutien();
  isManif: boolean = false;
  isRefused: string;

  constructor(
    private userService: UserService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getMStages();
    this.getManifs();
  }

  private getMStages() {
    this.userService.getMyMissionStages().subscribe((data) => {
      this.missionStages = data;
    });
  }

  private getManifs() {
    this.userService.getMyManifestations().subscribe((data) => {
      this.manifestations = data;
    });
  }

  changeList() {
    if (this.isManif) {
      this.isManif = false;
      this.getMStages();
      document.getElementById('changebtn').textContent = '=> Manifestations <=';
    } else {
      this.isManif = true;
      this.getManifs();
      document.getElementById('changebtn').textContent = '=> MissionStages <=';
    }
  }

  manifestationBtn() {
    this.isManif = true;
    this.getManifs();
  }

  missionStageBtn() {
    this.isManif = false;
    this.getMStages();
  }

  viewDetailsMStage(id: number) {
    this.adminService.getMissionStageById(id).subscribe((stage) => {
      this.mStage = stage;
    });
    this.adminService.getUserByMstage(id).subscribe((userdata) => {
      this.user = userdata;
    });
    this.adminService.getUserDonne(id).subscribe((donnedata) => {
      this.donnePro = donnedata;
    });
    this.adminService.getCadreByMStage(id).subscribe((cadredata) => {
      this.cadre = cadredata;
    });
    this.adminService.getSoutienByMStage(id).subscribe((soutiendata) => {
      this.soutien = soutiendata;
    });
    this.imprimerMStage(id);
  }

  viewDetailsManif(id: number) {
    this.adminService.getManifestationById(id).subscribe((manifdonne) => {
      this.manif = manifdonne;
    });
    this.adminService.getUserByManifId(id).subscribe((userdata) => {
      this.user = userdata;
    });
    this.adminService.getUserDonneByManifId(id).subscribe((donnedata) => {
      this.donnePro = donnedata;
    });
    this.adminService.getSoutienByManifId(id).subscribe((soutiendata) => {
      this.soutien = soutiendata;
    });
    this.imprimerManif(id);
  }

  imprimerManif(id: number) {
    this.userService.generateReport(id).subscribe((data: string) => {
      Swal.fire(
        'Inmpression',
        'L impression de la demande mission stage a ete fait avec success',
        'success'
      );
      window.open(data);
    });
  }

  imprimerMStage(id: number) {
    this.userService.exportReportMission(id).subscribe((data) => {
      Swal.fire(
        'Inmpression',
        'L impression de la demande manifestation a ete fait avec success',
        'success'
      );
      window.open(data);
    });
  }
}
