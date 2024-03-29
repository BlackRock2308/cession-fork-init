import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConventionSignerComponent } from 'src/app/workstation/COMPTABLE_CDMP/convention-signer/convention-signer.component';
import { ApiSettings } from 'src/app/workstation/generic/const/apiSettings.const';
import { SignerconventionPMEComponent } from '../../PME/signer-convention/signerconvention-pme/signerconvention-pme.component';
import Swal from 'sweetalert2';
import { StatutEnum } from 'src/app/workstation/model/statut-enum';
import { CorrigerConventionComponent } from 'src/app/workstation/COMPTABLE_CDMP/corrigerConvention/corriger-convention/corriger-convention.component';
import { ObservationService } from 'src/app/workstation/service/observation/observation.service';
import { Observation } from 'src/app/workstation/model/observation';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

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
  paiement: string;
  observation: void;
  private documentFileUrl = ApiSettings.API_CDMP + '/documents/file?path='
  observationLibelle: string;
  observationSave: Observation = {};

  constructor(public activeModal: NgbActiveModal,
    private tokenStorage: TokenStorageService,
    public ref: DynamicDialogRef, public dialogService: DialogService, public config: DynamicDialogConfig,
    private observationService:ObservationService) { }


  ngOnInit() {
    if(this.config.data.demande){
      this.demande = this.config.data.demande;
      if(this.demande.idDemande)
      {
        this.observationService.getObservationByDemandeCessionANDStatut(this.demande.idDemande,this.demande.statut.libelle).subscribe(
          data => {
              this.observationLibelle=data.libelle
          })
      }
    }

    this.srcFile = this.config.data.document.urlFile;
    this.dowloadFile(this.srcFile);
    this.profil = localStorage.getItem('profil');

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
   }
   
  dismiss() {
    this.ref.close();
  }

  docUploadProgress($event: any) {
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
  }

  pageRendered(e: CustomEvent) {
    this.pageRenderCb++;
  }

  textLayerRendered(e: CustomEvent) {
    // Callback Monitor variable
    this.textLayerRenderedCb++;


  }

  signerConventionDG() {
    const ref = this.dialogService.open(ConventionSignerComponent, {
      data: {
        convention: this.demande.conventions[0]
      },
      header: "Signer la convention",
      width: '40%',
      height: 'calc(70% - 100px)',
      baseZIndex: 50
    });
    this.dismiss();
  }

  signerConventionPME() {
    const ref = this.dialogService.open(SignerconventionPMEComponent, {
      data: {
        convention: this.demande.conventions[0]
      },
      header: "Signer la convention",
      width: '40%',
      height: 'calc(52% - 100px)',
      baseZIndex: 50
    });
    this.dismiss();
  }

  corrigerConvention() {
    const ref = this.dialogService.open(CorrigerConventionComponent, {
      data: {
        demande:  this.demande
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
    Swal.fire({
      title: 'Etes-vous sûr de vouloir rejeter la convention?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
      confirmButtonColor:'#99CC33FF',
      denyButtonColor:'#981639FF',
      cancelButtonColor:'#333366FF',
      customClass: {
        actions: 'my-actions',
        denyButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
    }).then((result) => {
      if (result.isConfirmed) {       
      this.observationSave.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
      this.observationSave.statut = {};
      this.observationSave.demandeid = this.demande.idDemande;
      this.observationSave.statut.libelle = StatutEnum.ConventionRejeteeParPME;
      this.observationSave.dateObservation = new Date();
      this.observationService.addObservation(this.observationSave)  
               .subscribe((response: any) => {
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
              setTimeout(() => {
                location.reload()
               }, 1500);
      } else if (result.isDenied) {
        Swal.fire('Opération de rejet annulée', '', 'info')
      }
    })

  }

  rejetConventionDG(){
    this.dismiss();
    Swal.fire({
      title: 'Etes-vous sûr de vouloir rejeter la convention?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
      confirmButtonColor:'#99CC33FF',
      denyButtonColor:'#981639FF',
      cancelButtonColor:'#333366FF',
      customClass: {
        actions: 'my-actions',
        denyButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
    }).then((result) => {
      if (result.isConfirmed) {
      this.observationSave.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
      this.observationSave.statut = {};
      this.observationSave.demandeid = this.demande.idDemande;
      this.observationSave.statut.libelle = StatutEnum.ConventionRejeteeParDG;
      this.observationSave.dateObservation = new Date();
      this.observationService.addObservation(this.observationSave).subscribe((response: any) => {
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
              setTimeout(() => {
                location.reload()
               }, 1500);
      } else if (result.isDenied) {
        Swal.fire('Opération de rejet annulée', '', 'info')
      }
    })
  }

}