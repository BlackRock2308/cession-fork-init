import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FileUploadService } from "src/app/workstation/service/fileUpload.service";
import Swal from "sweetalert2";
import { DetailsPaiement } from "../../model/detailsPaiements";
import { Document } from "../../model/document";
import { Utilisateur } from "../../model/utilisateur";
import { DetailsPaiementsService } from "../../service/paiements/details-paiements.services";

@Component({
  selector: "app-paiement-cdmp",
  templateUrl: "./add-detail-paiement-cdmp.component.html",
  styleUrls: ["./add-detail-paiement-cdmp.component.scss"],
  providers: [MessageService],
})
export class AddDetailPaiementCDMPComponent implements OnInit {
  selectedFiles: File[] = [];
  selectedFile?: File;
  images: any;
  docLoading: boolean;
  pdfPage: number;
  pageVariable = 1;
  zoom = 0.8;
  angle = 0;
  afterpageLoadedCb = 0;
  pageRenderCb = 0;
  textLayerRenderedCb = 0;
  totalPages: number;
  ext: string;
  modePaiment: any = null;
  documents: Document[] = [];
  document: Document;
  documentForm: FormGroup;
  detailPaiement:DetailsPaiement = {};
  user:Utilisateur={};
  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private uploadFileService: FileUploadService,
    public ref: DynamicDialogRef,
    private servicemsg: MessageService,
    private detailsPaiementsService: DetailsPaiementsService,
    public config: DynamicDialogConfig
  ) {
    this.user =  JSON.parse(sessionStorage.getItem('auth-user'));
  }

  dropdownItems = [
    { name: "Sélectionner", code: "" },
    { name: "Chèque", code: "CHEQUE" },
    { name: "Espèce", code: "ESPECE" },
    { name: "Virement", code: "VIREMENT" },
  ];
  ngOnInit() {
  this.detailPaiement.comptable = this.user.prenom+" "+this.user.nom;
  }
  dismiss() {
    this.ref.close();
  }

  handleClick() {
    document.getElementById("upload-file").click();
  }

  //sélectionner le fichier
  selectFile(files: any): void {
    this.selectedFiles = files.target.files[0];
    console.log(this.selectedFiles);
  }

  onSubmitForm() {
    this.detailsPaiementsService
      .addDetailPaiementCDMP(this.detailPaiement)
      .subscribe((res: DetailsPaiement) => {
        this.servicemsg.add({
          key: "tst",
          severity: "success",
          summary: "Success Message",
          detail: "CDMP payé avec succès",
        });
        this.dismiss();
      }),
      (error) => {
        this.servicemsg.add({
          key: "tst",
          severity: "danger",
          summary: "Erreur",
          detail: "Erreur, CDMP non payé",
        });
      };
  }
}
