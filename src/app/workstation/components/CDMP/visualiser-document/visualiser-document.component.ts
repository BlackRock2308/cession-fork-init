import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConventionSignerComponent } from 'src/app/workstation/COMPTABLE_CDMP/convention-signer/convention-signer.component';
import { fileUploadService } from 'src/app/workstation/service/fileUpload.service';

@Component({
  selector: 'app-visualiser-document',
  templateUrl: './visualiser-document.component.html',
  styleUrls: ['./visualiser-document.component.scss']
})
export class VisualiserDocumentComponent implements OnInit {
  src: any;
  srcFile: string;
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
  ext:string;
  profil: string;
  statut: string;
  convention: any;
  constructor(public activeModal: NgbActiveModal, private uploadFileService: fileUploadService, public ref: DynamicDialogRef, public dialogService: DialogService, public config: DynamicDialogConfig) { }

  ngOnInit() {
    this.srcFile = './assets/doctest.pdf';
    this.dowloadFile(this.config.data.document.path);
     this.convention = this.config.data.document;
    
    this.profil = localStorage.getItem('profil');

    this.statut = this.config.data.document.statut;
    
    
  }
  dowloadFile(path: string) {
    
    this.uploadFileService.dowloadFile(path)
      .subscribe(
        (data: any) => {
          if (data) {
            this.src = data[0];
            this.ext = this.src.path.split('.').pop();
            if (this.ext == "jpg" || this.ext == "png" || this.ext == "jpeg") {
              this.images = [{
                name: this.config.data.document.nomDocument,
                url: this.src
              }];
            }
            console.log("SRC", this.ext);
          }
        }
        ,
        (error) => {
          console.log("erreur de recuperation du document", error);
        }
      )
  }
  dismiss() {
    this.ref.close();
  }

  docUploadProgress($event: any) {
    console.log($event);
    if ($event.loaded == $event.total) {
      this.docLoading = false;
    }
  }
/**
 * Permet de faire un zoom plus sur l'affichage du document
 */
  plusZoom() {
    this.zoom = this.zoom + 0.10;
  }

  /**
 * Permet de faire un zoom moins sur l'affichage du document
 */
  minusZoom() {
    if (this.zoom > 0.8) {
      this.zoom = this.zoom - 0.10
    }
  }

  /**
 * Permet de télécharger le document
 */
  download(blob?) {
    const url = this.src.path;
    const filename = this.config.data.document.nomDocument;
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

  /**
   * PErmet d'imprimer le document sélectionner
   */
  print() {
    var dataView = this.src;
    const url = this.src.path;
    console.log('donne ' +JSON.stringify(url))
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

  /**
 * Permet de faire une rotation sur l'affichage du document
 */
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

/**
 * Permet d'aller à la page suivante dans le document
 */
  nextPage() {
    this.pageVariable++;
  }
/**
 * Permet de retourner à la page précédente dans le document
 */
  previousPage() {
    if (this.pageVariable > 1) {
      this.pageVariable--;
    }
  }

  /**
 * Permet de recupérer le nombre de page d'un document après son chargement.
 */
  afterLoadComplete(pdf: any) {
    this.afterpageLoadedCb++;
    this.totalPages = pdf.numPages;
    console.log('after-load-complete', this.totalPages);
  }

  pageRendered(e: CustomEvent) {
    this.pageRenderCb++;
    console.log('(page-rendered)');
  }

  textLayerRendered(e: CustomEvent) {
    // Callback Monitor variable
    this.textLayerRenderedCb++;

    // Finds anchors and sets hrefs void
    console.log('(text-layer-rendered)');

  }

  signerConvention() {
    const ref = this.dialogService.open(ConventionSignerComponent, {
      data: {
        convention: this.convention
      },
      header: "Signer la convention",
      width: '40%',
      height: 'calc(40% - 100px)',
      baseZIndex: 50
    });
    this.dismiss();
  }
}