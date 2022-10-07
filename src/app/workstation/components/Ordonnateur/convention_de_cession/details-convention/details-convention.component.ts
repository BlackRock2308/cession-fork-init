import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DemandeCession } from 'src/app/workstation/model/demande';
import { Documents } from 'src/app/workstation/model/document';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { DocumentService } from 'src/app/workstation/service/document/document.service';
import { FileUploadService } from 'src/app/workstation/service/fileUpload.service';
import { VisualiserDocumentComponent } from '../../../CDMP/visualiser-document/visualiser-document.component';

@Component({
  selector: 'app-details-convention',
  templateUrl: './details-convention.component.html',
  styleUrls: ['./details-convention.component.scss'],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig]
})
export class DetailsConventionComponent implements OnInit {
  items: ({ label: string; url: string; } | { label: string; url?: undefined; })[];
  home: { icon: string; url: string; };
  cols: { field: string; header: string; }[];
  demandeCession: DemandeCession;
  documents: Documents[];
  observation: string;
  pageVariable = 1;
  pageRenderCb = 0;
  totalPages: number;
  afterpageLoadedCb = 0;
  zoom = 0.8;
  angle = 0;
  src: any;
  document: Documents [];
  srcFile: string;
  ext: string;
  images: any;
  textLayerRenderedCb = 0;


  constructor(
    private demandeCessionService: DemandesCessionService,
    private documentService: DocumentService,
    private dialogService: DialogService,
    private uploadFileService: FileUploadService
  ) { }

  ngOnInit(): void {
    this.document = [{
      "id": 1,
      "nomDocument": "NINEA",
      "dateSoumission": new Date("01/02/2022"),
      "typeDocument": "NINEA",
      "path": "/assets/NINEA.pdf",
      "statut": "Convention-générée",
      "refBE": "6543568778",
      "ninea": 567865467567,
      "refDemande": "2022-3454",
      "raisonSocial": "CAMAIEU INTERNATIONAL"
    }]

    this.srcFile = "./assets/NINEA.pdf";
    this.demandeCessionService.getDemandeObs().subscribe(data => {
      this.demandeCession = data
      console.log(this.demandeCession)

    });
    this.dowloadFile(this.document[0].path);

    this.documentService.getDocumentsOrd().subscribe(data => {
      this.documents = data
    })

    this.cols = [
      { field: 'typeDocument', header: 'Type de document' },
      { field: 'nomDocument', header: 'Nom Document' },
      { field: 'dateSoumission', header: 'Date Soumission' }
    ];
    this.items = [
      { label: 'Liste des conventions', url: '/#/workstation/ordonnateur/conventions' },
      { label: 'Détail de la convention' }
    ];

    this.home = { icon: 'pi pi-home', url: '/#/workstation/ordonnateur/conventions' };

  }


  onSubmit(statut: string) {
    let body = {
      observation: this.observation,
      statut: statut
    }

    this.mettreAJourStatutConvention(body)


  }

  dowloadFile(path: string) {

    console.log('Affiche mon path ' + path)
    this.uploadFileService.dowloadFile(path)
      .subscribe(
        (data: any) => {
          if (data) {
            this.src = data[0];
            this.ext = this.src.path.split('.').pop();
            if (this.ext == "jpg" || this.ext == "png" || this.ext == "jpeg") {
              this.images = [{
                name: this.document[0].nomDocument,
                url: this.src
              }];
            }
            console.log("SRC", this.ext);
          }
        }
        ,
        (error) => {
          console.log("erreur de récupération du document", error);
        }
      )
  }

  pageRendered(e: CustomEvent) {
    this.pageRenderCb++;
    console.log('(page-rendered)');
  }

  download(blob?) {
    const url = this.src.path;
    const filename = this.document[0].nomDocument;
    fetch(url).then(function (t) {
      return t.blob().then((b) => {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.setAttribute("download", filename);
        a.click();
      }
      );
    });

  }

  textLayerRendered(e: CustomEvent) {
    // Callback Monitor variable
    this.textLayerRenderedCb++;

    // Finds anchors and sets hrefs void
    console.log('(text-layer-rendered)');

  }

  print() {
    var dataView = this.src;
    const url = this.src.path;
    console.log('donne ' + JSON.stringify(url))
    fetch(url).then(function (t) {
      return t.blob().then((b) => {
        const element = document.createElement('iframe');   // Create an IFrame.
        element.style.visibility = "hidden";    // Hide the frame.
        element.src = URL.createObjectURL(b); // Set source.
        document.body.appendChild(element);  // Ajoute du frame sur la nouvelle page.
        element.contentWindow.focus();       // Set focus.
        element.contentWindow.print();
      }
      );
    });
  }


  minusZoom() {
    if (this.zoom > 0.8) {
      this.zoom = this.zoom - 0.10
    }
  }

  plusZoom() {
    this.zoom = this.zoom + 0.10;
  }

  nextPage() {
    this.pageVariable++;
  }

  previousPage() {
    if (this.pageVariable > 1) {
      this.pageVariable--;
    }
  }

  afterLoadComplete(pdf: any) {
    this.afterpageLoadedCb ++;
    this.totalPages = pdf.numPages;
    console.log('after-load-complete', this.totalPages);
  }

  rotate() {
    console.log(this.angle);
    if (this.angle === 0) {
      this.angle = 90;
    } else if (this.angle === 90) {
      this.angle = 180;
    } else if (this.angle === 180) {
      this.angle = 0;
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

  mettreAJourStatutConvention(body: any) {
    this.demandeCessionService.patchConvention(this.demandeCession.id, body).subscribe()
  }

}