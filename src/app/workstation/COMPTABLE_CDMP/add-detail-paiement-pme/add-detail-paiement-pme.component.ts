import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
  selector: "app-paiement-pme",
  templateUrl: "./add-detail-paiement-pme.component.html",
  styleUrls: ["./add-detail-paiement-pme.component.scss"],
  providers: [MessageService],
})
export class AddDetailsPaiementPMEComponent implements OnInit {
  selectedFiles: File ;
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
  detailPaiement: DetailsPaiement = {};
  user: Utilisateur = {};
  modePaiement: ModePaiement = {};
  observation: Observation={};
  message:string;
  form!: FormGroup;
  submit: boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public activeModal: NgbActiveModal,
    private uploadFileService: FileUploadService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private servicemsg: MessageService,
    private detailsPaiementsService: DetailsPaiementsService,
    private tokenStorage:TokenStorageService,
    private observationService:ObservationService
  ) {
    this.user = JSON.parse(sessionStorage.getItem("auth-user"));
  }

  dropdownItems = [
    { name: "Sélectionner", code: "" },
    { name: "Chèque", code: "CHEQUE" },
    { name: "Virement", code: "VIREMENT" },
  ];
  ngOnInit() {
    this.message = "Champ obligatoire";
    this.detailPaiement.comptable = this.user.prenom + " " + this.user.nom;
    this.form = this.formBuilder.group({
      modePaiement: ['', Validators.required],
      referencePaiement: ['', Validators.required],
      montant: ['', Validators.required],
      payer: [{ value: '', disabled: true } ],
      preuveFile: ['', Validators.required]
    });
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
    this.selectedFiles = files.target.files[0];
  }

  onSubmitForm() {
    this.submit = true;
    if (this.form.invalid) {
    return;
  }

  this.ref.close()

  Swal.fire({
    title: 'Voulez-vous continuer le paiement?',
    showDenyButton: true,
    confirmButtonText: 'Oui',
    denyButtonText: `Annuler`,
    confirmButtonColor:'#99CC33FF',
      denyButtonColor:'#981639FF',
      cancelButtonColor:'#333366FF',
      customClass: {
        actions: 'my-actions',
        denyButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.detailPaiement.modePaiement = this.modePaiement.code;
    this.detailPaiement.paiementDto = this.config.data.paiement;
    this.detailPaiement.datePaiement = new Date();
    this.detailsPaiementsService
      .addDetailPaiementPME(this.detailPaiement)
      .subscribe((res: any) => {
        let data = JSON.parse(JSON.stringify(res));
        if (data.id) {
          let typeDocument = "";
          if (res.modePaiement === "CHEQUE") {
            typeDocument = "CHEQUE";
          } else {
            typeDocument = "PREUVE_VIREMENT";
          }
          //for (let file of this.selectedFiles) {
            this.uploadFileService
              .uploadFile('/detailsPaiements/', data.id, this.selectedFiles, typeDocument)
              .subscribe((resFil: any) => {
                console.log(resFil);
              });
          //}
        }
       if(res.status == "503"){
        this.dismiss();
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Le montant renseigné dépasse le solde à payer à la PME!',
        })
       }else{
        this.close(this.detailPaiement);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Paiement PME enregistré avec succès.',
          showConfirmButton: false,
          timer: 1500
        })          
        window.location.reload();
        }
      }),
      (error) => {
        this.servicemsg.add({
          key: "tst",
          severity: "danger",
          summary: "Erreur",
          detail: "Erreur, PME non payé",
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
      }
    } else if (result.isDenied) {
      Swal.fire('Paiement annulée', '', 'info')
    }
  })
    
      
  }
}

interface ModePaiement {
  name?: string;
  code?: string;
}
