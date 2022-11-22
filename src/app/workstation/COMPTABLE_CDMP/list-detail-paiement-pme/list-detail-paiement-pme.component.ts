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
import { AddDetailsPaiementPMEComponent } from "../add-detail-paiement-pme/add-detail-paiement-pme.component";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { BonEngagement } from "../../model/bonEngagement";
import { DemandeCession } from "../../model/demande";
import { DemandesCessionService } from "../../service/demandes_cession/demandes-cession.service";
registerLocaleData(localeFr, 'fr')
@Component({
  selector: "app-list-paiement-pme",
  templateUrl: "./list-detail-paiement-pme.component.html",
  styleUrls: ["./list-detail-paiement-pme.component.scss"],
  providers: [DialogService],
})
export class ListPaiementPMEComponent implements OnInit {
  paiementDialog: boolean;

  detailsPaiements: DetailsPaiement[];

  paiement: Paiements;

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
  montantRecuPME:number = 0;

  bonEngagement:BonEngagement={};
  constructor(
    private documentService: DocumentService,
    public dialogService: DialogService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute, private router: Router,
    private paiementService:PaiementsService,
    private detailsPaiementsService: DetailsPaiementsService,
    private demandesCessionService:DemandesCessionService
  ) {
    this.route.params.subscribe(
      (params: Params) => (this.idPaiement = params["idPaiement"])
    );
    this.breadcrumbService.setItems([
      { label: "Paiements", routerLink: ["comptable/paiements"] },
      { label: "Paiement PME" },
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
    this.getAllDetailPaiements();
    this.getPaiementAndBonEngagement();

    this.cols = [
      { field: "datePaiement", header: "Date Paiement" },
      { field: "payer", header: "Enregistré par" },
      { field: "montant", header: "Montant" },
      { field: "modePaiement", header: "Mode Paiement" },
    ];
  }

  getAllDetailPaiements() {
    this.detailsPaiementsService.getDetailPaiementPMEByPaiement(this.idPaiement)
    .subscribe((res:DetailsPaiement[]) =>{
      this.detailsPaiements = res;
      this.detailsPaiements.forEach(element => {
        this.montantRecuPME = this.montantRecuPME +element.montant;
      });
    })
  }

  getPaiementAndBonEngagement(){
    this.paiementService.getPaiementsById(this.idPaiement)
    .subscribe((res:Paiements) =>{
     if(res){
      this.paiement = res;
      this.demandesCessionService.getDemandesCessionById(res.demandeId)
      .subscribe((resp: DemandeCession) =>{
        this.bonEngagement = resp.bonEngagement;
      })
     }
    });
  }

  verifierDemande(paiement: Paiements) {
    this.paiement = { ...paiement };
    this.paiementDialog = true;
    this.router.navigate(['workstation/cdmp/visualiser-demandes']);
  }

  ajouterPaimentPME() {
    const ref = this.dialogService.open(AddDetailsPaiementPMEComponent, {
      data: {
        paiement: this.paiement,
      },
      header: "Paiement de la PME",
      width: "50%",
      //height: "calc(90% - 200px)",
      baseZIndex: 10000,
    });
    // ref.onClose.subscribe((detailsPaiement: DetailsPaiement) => {
    //   if(detailsPaiement != null || detailsPaiement != undefined){
    //     this.detailsPaiements.unshift(detailsPaiement);
    //   }
    // });
    
  }

  detailPaimentPME(document: any) {
    let paiement = "true";
    const ref = this.dialogService.open(VisualiserDocumentComponent, {
      data: {
        document: document[0],
        paiement: paiement,
      },
      header: "Preuve de Paiement PME",
      width: "50%",
      //height: "calc(100% - 200px)",
      baseZIndex: 10000,
    });
  }
}
