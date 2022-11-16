import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { FileUploadService } from "src/app/workstation/service/fileUpload.service";
import Swal from "sweetalert2";
import { DetailsPaiement } from "../../model/detailsPaiements";
import { Document } from "../../model/document";
import { Observation } from "../../model/observation";
import { Utilisateur } from "../../model/utilisateur";
import { ObservationService } from "../../service/observation/observation.service";
import { DetailsPaiementsService } from "../../service/paiements/details-paiements.services";

@Component({
  selector: "app-paiement-cdmp",
  templateUrl: "./add-detail-paiement-cdmp.component.html",
  styleUrls: ["./add-detail-paiement-cdmp.component.scss"],
  providers: [MessageService],
})
export class AddDetailPaiementCDMPComponent implements OnInit {
  selectedFiles: File[] = [];
  selectedFile?: File | null = null;
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
  detailPaiement: DetailsPaiement = {};
  user: Utilisateur = {};
  modePaiement: ModePaiement = {};
  observation: Observation={};
  constructor(
    public activeModal: NgbActiveModal,
    private uploadFileService: FileUploadService,
    public ref: DynamicDialogRef,
    private servicemsg: MessageService,
    private detailsPaiementsService: DetailsPaiementsService,
    public config: DynamicDialogConfig,
    private observationService:ObservationService,
    private tokenStorage:TokenStorageService
  ) {
    this.user = JSON.parse(sessionStorage.getItem("auth-user"));
  }

  dropdownItems = [
    { name: "Sélectionner", code: "" },
    { name: "Chèque", code: "CHEQUE" },
    { name: "Espèce", code: "ESPECE" },
    { name: "Virement", code: "VIREMENT" },
  ];
  ngOnInit() {
    this.detailPaiement.comptable = this.user.prenom + " " + this.user.nom;
  }
  dismiss() {
    this.close(null);
  }

  close(detailsPaiement:DetailsPaiement){
    this.ref.close(detailsPaiement);
  }

  handleClick() {
    document.getElementById("upload-file").click();
  }

  //sélectionner le fichier
  selectFile(files: any): void {
    this.selectedFiles = files.target.files;
  }

  onSubmitForm() {
    this.detailPaiement.modePaiement = this.modePaiement.code;
    this.detailPaiement.paiementDto = this.config.data.paiement;
    this.detailPaiement.datePaiement = new Date();
    this.detailsPaiementsService
      .addDetailPaiementCDMP(this.detailPaiement)
      .subscribe((res: DetailsPaiement) => {
        if (res.id) {
          let typeDocument = "";
          if (res.modePaiement === "CHEQUE") {
            typeDocument = "CHEQUE";
          } else {
            typeDocument = "PREUVE_VIREMENT";
          }
          for (let file of this.selectedFiles) {
            this.uploadFileService
              .uploadFile('/detailsPaiements/', res.id, file, typeDocument)
              .subscribe((resFil: any) => {
                console.log(resFil);
              });
          }
        }
        this.close(this.detailPaiement);
        Swal.fire({
          html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>CDMP payé avec succès.</p><br><p style='font-size: large;font-weight: bold;'></p>",
          color:"#203359",
          confirmButtonColor:"#99CC33",
          confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
          allowOutsideClick:false,
          
        })
      }),
      (error) => {
        this.servicemsg.add({
          key: "tst",
          severity: "danger",
          summary: "Erreur",
          detail: "Erreur, CDMP non payé",
        });
      },
      () => {
        this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
        this.observation.statut={}
        this.observation.demandeid =  this.detailPaiement.paiementDto.demandecessionid;
        this.observation.statut.libelle =this.detailPaiement.paiementDto.statutPme.libelle;
        console.log(this.observation)

        this.observationService.postObservation(this.observation).subscribe(data => 
          console.log(data)
          );
      };
  }
}

interface ModePaiement {
  name?: string;
  code?: string;
}