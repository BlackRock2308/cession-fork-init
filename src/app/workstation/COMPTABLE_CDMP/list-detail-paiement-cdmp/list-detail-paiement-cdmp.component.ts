import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MenuItem, MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { BreadcrumbService } from "src/app/core/breadcrumb/breadcrumb.service";
import { VisualiserDocumentComponent } from "../../components/CDMP/visualiser-document/visualiser-document.component";
import { DetailsPaiement } from "../../model/detailsPaiements";
import { Documents } from "../../model/document";
import { Paiements } from "../../model/paiements";
import { DocumentService } from "../../service/document/document.service";
import { DetailsPaiementsService } from "../../service/paiements/details-paiements.services";
import { PaiementsService } from "../../service/paiements/paiements.service";
import { AddDetailPaiementCDMPComponent } from "../add-detail-paiement-cdmp/add-detail-paiement-cdmp.component";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr')
@Component({
  selector: "app-list-paiement-cdmp",
  templateUrl: "./list-detail-paiement-cdmp.component.html",
  styleUrls: ["./list-detail-paiement-cdmp.component.scss"],
  providers: [DialogService],
})
export class ListPaiementCdmpComponent implements OnInit {
  paiementDialog: boolean;

  detailsPaiements: DetailsPaiement[]=[];

  submitted: boolean;

  cols: any[];

  statuses: any[];

  rowsPerPageOptions = [5, 10, 20];

  items: MenuItem[];

  activeIndex: number = 1;
  documents: any[];
  idPaiement: number;
  angle = 0;
  zoom = 0.8;
  textLayerRenderedCb = 0;
  value1: any;
  totalPages: number;
  afterpageLoadedCb = 0;
  pageVariable = 1;
  ref: DynamicDialogRef;
  home: MenuItem;
  paiement:Paiements ={};
  constructor(
    private documentService: DocumentService,
    private paiementsService: PaiementsService,
    public dialogService: DialogService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute, private router:Router,
    private detailsPaiementsService: DetailsPaiementsService
  ) {
    this.route.params.subscribe(
      (params: Params) => (this.idPaiement = params["idPaiement"])
    );
    this.breadcrumbService.setItems([
      { label: "Paiements", routerLink: ["comptable/paiements"] },
      { label: "Paiement CDMP" },
    ]);
    this.breadcrumbService.setHome({
      icon: "pi pi-home",
      routerLink: ["cdmp/dashboard"],
    });
  }

  ngOnInit(): void {
    this.documentService.getDeocuments().subscribe((data) => {
      this.documents = data;
    });
    this.cols = [
      { field: "referencePaiement", header: "Référence Paiement" },
      { field: "datePaiement", header: "Date Paiement" },
      { field: "payer", header: "Enregistré par" },
      { field: "montant", header: "Montant" },
    ];
    this.getAllDetailsPaiements();
    this.getPaiement();
  }

  verifierDemande(paiement: Paiements) {
    this.paiement = { ...paiement };
    this.paiementDialog = true;
    this.router.navigate(['workstation/cdmp/visualiser-demandes']);
  }
  getAllDetailsPaiements() {
    this.detailsPaiementsService.getDetailPaiementCDMPByPaiement(this.idPaiement)
    .subscribe((res:DetailsPaiement[]) =>{
      this.detailsPaiements = res;
    })
  }

  getPaiement(){
    this.paiementsService.getPaiementsById(this.idPaiement)
    .subscribe((res:Paiements) =>{
      this.paiement = res;
    });
  }

  ajouterPaimentCDMP() {
    const ref = this.dialogService.open(AddDetailPaiementCDMPComponent, {
      data: {
        paiement: this.paiement,
      },
      header: "Paiement de la CDMP par SICA",
      width: "50%",
      baseZIndex: 10000,
    });
  //   ref.onClose.subscribe((detailsPaiement: DetailsPaiement) => {
  //     if(detailsPaiement != null || detailsPaiement != undefined){
  //       this.detailsPaiements.unshift(detailsPaiement);
  //     }
      
      
  // });
    // .close((result) => {
    //   this.getAllDetailsPaiements();
    // });
  }

  detailPaimentCDMP(document: any) {
    let paiement = "true";
    const ref = this.dialogService.open(VisualiserDocumentComponent, {
      data: {
        document: document[0],
        paiement: paiement,
      },
      header: "Preuve de Paiement CDMP",
      width: "60%",
      //height: "calc(100% - 200px)",
      baseZIndex: 10000,
    });
  }
}
