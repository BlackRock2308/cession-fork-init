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

  constructor(
    private documentService: DocumentService,
    public dialogService: DialogService,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private paiementService:PaiementsService,
    private detailsPaiementsService: DetailsPaiementsService
  ) {
    this.route.params.subscribe(
      (params: Params) => (this.idPaiement = params["idPaiement"])
    );
    this.breadcrumbService.setItems([
      { label: "Paiements", routerLink: ["comptable/paiements"] },
      { label: "Paiment PME" },
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
    this.getAllPaiements();

    this.cols = [
      { field: "datePaiement", header: "Date Paiement" },
      { field: "payer", header: "Enregistré par" },
      { field: "montant", header: "Montant" },
      { field: "modePaiement", header: "Mode Paiement" },
    ];
  }

  getAllPaiements() {
    this.detailsPaiementsService.getDetailPaiementPMEByPaiement(this.idPaiement)
    .subscribe((res:DetailsPaiement[]) =>{
      this.detailsPaiements = res;
    })
  }

  getPaiement(){
    this.paiementService.getPaiementsById(this.idPaiement)
    .subscribe((res:Paiements) =>{
      this.paiement = res;
    })
  }

  verifierDemande(paiement: Paiements) {
    this.paiement = { ...paiement };
    this.paiementDialog = true;
    //this.router.navigate(['workstation/cdmp/visualiser-demandes']);
  }

  ajouterPaimentPME() {
    const ref = this.dialogService.open(AddDetailsPaiementPMEComponent, {
      data: {
        paiement: this.paiement,
      },
      header: "Paiement de la PME",
      width: "50%",
      height: "calc(90% - 200px)",
      baseZIndex: 10000,
    });
  }

  detailPaimentPME(document: Documents) {
    let paiement = "true";
    const ref = this.dialogService.open(VisualiserDocumentComponent, {
      data: {
        document: document,
        paiement: paiement,
      },
      header: "Preuve de Paiement PME",
      width: "50%",
      height: "calc(100% - 200px)",
      baseZIndex: 10000,
    });
  }
}
