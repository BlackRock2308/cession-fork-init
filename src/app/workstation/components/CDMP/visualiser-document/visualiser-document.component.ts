import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConventionSignerComponent } from 'src/app/workstation/COMPTABLE_CDMP/convention-signer/convention-signer.component';
import { ApiSettings } from 'src/app/workstation/generic/const/apiSettings.const';
import { DemandeCession } from 'src/app/workstation/model/demande';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { FileUploadService } from 'src/app/workstation/service/fileUpload.service';
import { SignerconventionPMEComponent } from '../../PME/signer-convention/signerconvention-pme/signerconvention-pme.component';
import Swal from 'sweetalert2';
import { StatutEnum } from 'src/app/workstation/model/statut-enum';
import { Router } from '@angular/router';
import { ConventionEnregistreeComponent } from 'src/app/workstation/COMPTABLE_CDMP/convention-enregistree/convention-enregistree.component';
import { CorrigerConventionComponent } from 'src/app/workstation/COMPTABLE_CDMP/corrigerConvention/corriger-convention/corriger-convention.component';

@Component({
  selector: 'app-visualiser-document',
  templateUrl: './visualiser-document.component.html',
  styleUrls: ['./visualiser-document.component.scss']
})
export class VisualiserDocumentComponent implements OnInit {

  demandes:any[] = [] ;
  statuts:any[];
  demande:any;
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
  ext: string;
  profil: string;
  statut: string;
  convention: any;
  paiement: string;
  observation: void;
  private documentFileUrl = ApiSettings.API_CDMP + '/documents/file?path='


  constructor(public activeModal: NgbActiveModal,
    private demandeCessionService:DemandesCessionService,
    private uploadFileService: FileUploadService, 
    private router : Router,
    public ref: DynamicDialogRef, public dialogService: DialogService, public config: DynamicDialogConfig) { }


  ngOnInit() {

    this.demandeCessionService.getDemandeObs().subscribe(data => {
      this.demande = data
      console.log(this.demande , data)
    })
    this.srcFile = this.config.data.document.urlFile;
    console.log('test '+this.srcFile)
    this.dowloadFile(this.srcFile);
    this.convention = this.config.data.document;
    this.profil = localStorage.getItem('profil');
    console.log(this.profil)

    this.statut = this.config.data.demande?.statut;
    if (this.config.data.paiement === 'true') {
      this.paiement = 'true';
    }
    this.observation = this.config.data.document.observation;

    
   
    this.statuts = [
      {label: 'Convention Enregistrée', value: 'CONVENTION_GENEREE'},
      {label: 'Convention Rejetée', value: 'CONVENTION_CORRIGEE'},
      {label: 'Convention Signée par le PME', value: 'CONVENTION_SIGNEE_PAR_PME'},
      {label: 'Convention Signée par le DG', value: 'CONVENTION_SIGNEE_PAR_DG'},
      {label: 'Convention Générée', value: 'CONVENTION_ACCEPTEE'},
      {label: 'Convention Transmise', value: 'CONVENTION_TRANSMISE'},
      {label: 'Convention Générée', value: 'CONVETION_REJETEE'},
      {label: 'Convention Générée', value: 'NON_RISQUEE'}
    ]
  }
  dowloadFile(path: string) {

    this.src=this.documentFileUrl+path;

  //   this.uploadFileService.dowloadFile(path)
  //     .subscribe(
  //       (data: any) => {
  //         if (data) {
  //           console.log('merci de d'+ data)
  //           this.src = data;
  //           console.log('merci de afficher ' +JSON.stringify( this.src))
  //          // this.ext = this.src.url.split('.').pop();
  //           // if (this.ext == "jpg" || this.ext == "png" || this.ext == "jpeg") {
  //           //   this.images = [{
  //           //     name: this.config.data.document.nom,
  //           //     url: this.src
  //           //   }];
  //           // }
  //           // console.log("SRC", this.ext);
  //         }
  //       }
  //       ,
  //       (error) => {
  //         console.log("erreur de récupération du document", error);
  //       }
  //     )
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
    const url = this.src;
    const filename = this.config.data.document.nom;
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
    const url = this.src;
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

  signerConventionDG() {
    const ref = this.dialogService.open(ConventionSignerComponent, {
      data: {
        convention: this.convention
      },
      header: "Signer la convention",
      width: '40%',
      height: 'calc(60% - 100px)',
      baseZIndex: 50
    });
    this.dismiss();
  }

  signerConventionPME() {
    const ref = this.dialogService.open(SignerconventionPMEComponent, {
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

  corrigerConvention() {
    const ref = this.dialogService.open(CorrigerConventionComponent, {
      data: {
        convention: this.convention
      },
      header: "Corriger la convention",
      width: '40%',
      height: 'calc(60% - 100px)',
      baseZIndex: 50
    });
    this.dismiss();
  }
  rejetConventionPME() {
    this.dismiss();
    setTimeout(() => {
      location.reload()
     }, 1500);

    let body = {
      
      idDemande:this.demande.idDemande
  }
  console.log(body)

  this.demandeCessionService.updateStatut(this.demande.idDemande,StatutEnum.ConventionRejeteeParPME)
            .subscribe((response: any) => {
              console.log(response)

              //console.log(StatutEnum.ConventionRejeteeParPME)
          },
          (error)=>{},
          ()=>{
            Swal.fire({
              position: 'center',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>La convention a  été rejetée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
                color:"#203359",
                confirmButtonColor:"#99CC33",
                confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
                allowOutsideClick:false,
                
              })
            

          })

  }

  rejetConventionDG(){
    setTimeout(() => {
      location.reload()
     }, 1500);
    this.dismiss();

    
    let body = {
      
      idDemande:this.demande.idDemande
  }
  console.log(body)

  this.demandeCessionService.updateStatut(this.demande.idDemande,StatutEnum.ConventionRejeteeParDG)
            .subscribe((response: any) => {
              console.log(response)
             // this.dismiss();

             // console.log(StatutEnum.ConventionRejeteeParDG)
          },
          (error)=>{},
          ()=>{
            Swal.fire({
              position: 'center',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>La convention a  été rejetée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
                color:"#203359",
                confirmButtonColor:"#99CC33",
                confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
                allowOutsideClick:false,
                
              })
              this.dismiss();

          })
  }

}