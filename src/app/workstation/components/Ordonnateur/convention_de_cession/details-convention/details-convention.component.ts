import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DemandeCession } from 'src/app/workstation/model/demande';
import { Documents } from 'src/app/workstation/model/document';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { DocumentService } from 'src/app/workstation/service/document/document.service';
import { VisualiserDocumentComponent } from '../../../CDMP/visualiser-document/visualiser-document.component';

@Component({
  selector: 'app-details-convention',
  templateUrl: './details-convention.component.html',
  styleUrls: ['./details-convention.component.scss'],
  providers:[DialogService]
})
export class DetailsConventionComponent implements OnInit {
  items: ({ label: string; url: string; } | { label: string; url?: undefined; })[];
  home: { icon: string; url: string; };
  cols: { field: string; header: string; }[];
  demandeCession: DemandeCession;
  documents: Documents[];
  observation:string;

  constructor(
    private demandeCessionService:DemandesCessionService,
    private documentService:DocumentService,
    private dialogService:DialogService
  ) { }

  ngOnInit(): void {
    this.demandeCessionService.getDemandeObs().subscribe(data=>{
      this.demandeCession=data
      console.log(this.demandeCession)

    })

    this.documentService.getDeocuments().subscribe(data=>{
      this.documents=data
    })

    this.cols = [
      {field: 'typeDocument', header: 'Type de document'},
      {field: 'nomDocument', header: 'Nom Document'},
      {field: 'dateSoumission', header: 'Date Soumission'}
  ];
this.items = [
  { label: 'Liste des demandes de cession',url:'/#/workstation/ordonnateur/conventions' },
  {label:'Traitement recevabilité'}
];

this.home = { icon: 'pi pi-home', url: '/#/workstation/ordonnateur/conventions' };

}


onSubmit(statut:string){
  let body={
    observation:this.observation,
    statut:statut
  }


}


visualiserDocument(document: Documents) {
  let nom = document.nomDocument;
  const ref = this.dialogService.open(VisualiserDocumentComponent, {
    data: {
      document: document
    },
    header: nom,
    width: '70%',
    height: 'calc(100% - 100px)',
    baseZIndex: 10000
  });
}

mettreAJourStatutConvention(){
  //this.demandeCessionService.patchConvention()
}

}