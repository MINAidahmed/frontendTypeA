import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MailMessage } from 'src/app/controller/model/mailmessages.model';
import { AdminService } from 'src/app/controller/service/admin.service';
import Swal from 'sweetalert2';
import { DialogData } from './dialogData.service';

@Component({
  selector: 'app-mail-form',
  templateUrl: './mail-form.component.html',
  styleUrls: ['./mail-form.component.css'],
})
export class MailFormComponent implements OnInit {
  body: string =
    'Mme Hanane NEKOUA\nDIVISION RECHERCHE SCIENTIFIQUE\nPRÉSIDENCE UNIVERSITÉ CADI AYYAD\nBP 511, Av Moulay Abdellah, Marrakech\nTél : 05 24 43 48 13/14\nFax : 05 24 43 44 94\nCourrier : ha.nekoua@uca.ma';
  mssgsMail: MailMessage = new MailMessage();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private adminService: AdminService,
    private dialogRef: MatDialogRef<MailFormComponent>
  ) {}

  ngOnInit(): void {
    this.mssgsMail.toEmail = this.data.email;
    this.mssgsMail.body = this.body;
    if (this.data.type) {
      this.adminService
        .getLettreMission(this.data.id)
        .subscribe((pathdata: string) => {
          this.mssgsMail.pathToAttachement = pathdata;
        });
    } else {
      this.adminService
        .getLettreManif(this.data.id)
        .subscribe((pathdata: string) => {
          this.mssgsMail.pathToAttachement = pathdata;
        });
    }
  }

  Valider() {
    if (this.mssgsMail.subject !== undefined && this.data.type) {
      this.adminService
        .AcceptMStage(this.data.id, this.mssgsMail)
        .subscribe((ret: any) => {
          if (ret == 1) {
            this.dialogRef.close();
            Swal.fire(
              'Email envoyer',
              'Email d acceptation de la demande Mission Stage a ete envoyer avec succes',
              'success'
            );
          } else {
            Swal.fire(
              'Erreur',
              'Email d acceptation ete pas envoyer veuillez verifier les champs',
              'error'
            );
          }
        });
    } else if (this.mssgsMail.subject !== undefined && !this.data.type) {
      this.adminService
        .AcceptManif(this.data.id, this.mssgsMail)
        .subscribe((ret: any) => {
          if (ret == 1) {
            this.dialogRef.close();
            Swal.fire(
              'Email envoyer',
              'Email d acceptation de la demande Mission Stage a ete envoyer avec succes',
              'success'
            );
          } else {
            Swal.fire(
              'Erreur',
              'Email d acceptation ete pas envoyer veuillez verifier les champs',
              'error'
            );
          }
        });
    } else {
      document.getElementById('sujet').textContent = 'Sujet peut pas etre vide';
    }
  }
}
