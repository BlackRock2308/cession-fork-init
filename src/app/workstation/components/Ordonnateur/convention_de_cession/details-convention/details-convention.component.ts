import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { Convention} from 'src/app/workstation/model/demande';
import { Document, Documents } from 'src/app/workstation/model/document';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { FileUploadService } from 'src/app/workstation/service/fileUpload.service';
import { VisualiserDocumentComponent } from '../../../CDMP/visualiser-document/visualiser-document.component';
import { StatutEnum } from 'src/app/workstation/model/statut-enum';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PaiementsService } from 'src/app/workstation/service/paiements/paiements.service';
import { Observation } from 'src/app/workstation/model/observation';
import { ObservationService } from 'src/app/workstation/service/observation/observation.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ApiSettings } from 'src/app/workstation/generic/const/apiSettings.const';
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
  demandeCession: any;
  documents: Document[]=[];
  observation: Observation = {};
  pageVariable = 1;
  pageRenderCb = 0;
  totalPages: number;
  afterpageLoadedCb = 0;
  zoom = 0.8;
  angle = 0;
  src: any;
  docConventions: Document[];
  conventions: Convention[]
  ext: string;
  images: any;
  textLayerRenderedCb = 0;
  private documentFileUrl = ApiSettings.API_CDMP + '/documents/file?path='
  observationLibelle: string;

  constructor(
    private router: Router,
    private demandeCessionService: DemandesCessionService,
    private paiementService: PaiementsService,
    private dialogService: DialogService,
    public ref: DynamicDialogRef,
    private breadcrumbService: BreadcrumbService,
    private observationService: ObservationService,
    private tokenStorage: TokenStorageService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Liste des conventions', routerLink: 'ordonnateur/conventions' },
      { label: 'Détail de la convention' }
    ]);
    this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink: ['/ordonnateur/conventions'] });
  }

  ngOnInit(): void {
    this.demandeCessionService.getDemandeObs().subscribe(data => {
      this.demandeCession = data
      
      console.log(this.demandeCession)
      
      this.documents=this.documents.concat(this.demandeCession.bonEngagement.documents)
      this.documents=this.documents.concat(this.demandeCession.pme.documents)
      this.documents=this.documents.concat(this.demandeCession.documents)
      this.conventions = this.demandeCession.conventions;
      console.log('afficher1' +JSON.stringify(this.conventions ))
      this.conventions.forEach(el => {
        this.docConventions = el.documents
        this.documents=this.documents.concat(el.documents)
      })
      console.log('afficher' +JSON.stringify( this.docConventions))
      //this.documents = this.docConventions;
      this.conventions = this.demandeCession.convention;

      //this.conventions.forEach(el => this.docConventions = el.documents )

      this.observationService.getObservationByDemandeCessionANDStatut(this.demandeCession.idDemande,this.demandeCession.statut.libelle).subscribe(
        data => {
            this.observationLibelle=data.libelle
            console.log(this.observationLibelle)
        })


     });
    console.log(this.documents)

    this.dowloadFile(this.docConventions[0].urlFile);
    console.log('affiche2r' + this.docConventions[0].urlFile)

    this.cols = [
      { field: 'typeDocument', header: 'Type de document' },
      { field: 'nomDocument', header: 'Nom Document' },
      { field: 'dateSoumission', header: 'Date Soumission' }
    ];
  }

  onSubmitRejet() {

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
        this.conventionRejetee();
        this.router.navigate(['workstation/ordonnateur/conventions'])

      }
    })

  }

  onSubmitAccept() {

    Swal.fire({
      title: 'Voulez-vous accepter la convention?',
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
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.conventionAcceptee();
      } else if (result.isDenied) {
        Swal.fire('Validation annulée', '', 'info')
      }
    })
    
  }

  private async conventionRejetee() {
    await this.demandeCessionService.updateStatut(this.demandeCession.idDemande,StatutEnum.ConventionRejetee)
            .subscribe((response: any) => {
              console.log(response)
              console.log(StatutEnum.ConventionRejetee)
          },
          (error)=>{},
          ()=>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
              html: "<p style='font-size: large;font-weight: bold;justify-content:center;'>La convention a bien été rejetée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
              color: "#203359",
              confirmButtonColor: "#99CC33",
              confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
              allowOutsideClick: false,
  
            }).then(() => {
  
              this.router.navigate(['workstation/ordonnateur/conventions'])
            })
           
          })
          this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
          this.observation.statut={}    
          this.observation.demandeid= this.demandeCession.idDemande;
          this.observation.statut.libelle=StatutEnum.ConventionRejetee;
          await this.observationService.postObservation(this.observation).subscribe(data => console.log(data))
  }

  private async conventionAcceptee() {
    let body = {

      demandeId: this.demandeCession.idDemande,
    }
    console.log(body)
    await this.demandeCessionService.updateStatut(this.demandeCession.idDemande, StatutEnum.ConventionAcceptee)
      .subscribe((response: any) => {
        console.log(response)
        console.log(StatutEnum.ConventionAcceptee)
      },
        (error) => { },
        () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            html: "<p style='font-size: large;font-weight: bold;justify-content:center;'>La convention a  été acceptée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
            color: "#203359",
            confirmButtonColor: "#99CC33",
            confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
            allowOutsideClick: false,

          }).then(() => {

            this.router.navigate(['workstation/ordonnateur/conventions'])
          })
          this.paiementService.postPaiement(body).subscribe(
            data => { console.log(data) })
        })

    this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
    this.observation.statut = {}
    this.observation.demandeid = this.demandeCession.idDemande;
    this.observation.statut.libelle = StatutEnum.ConventionAcceptee;
    await this.observationService.postObservation(this.observation).subscribe(data => console.log(data))
  }

  dowloadFile(path: string) {

    this.src = this.documentFileUrl + path;
  }

  pageRendered(e: CustomEvent) {
    this.pageRenderCb++;
    console.log('(page-rendered)');
  }

  download(blob?) {
    const url = this.src;
    const filename = this.docConventions[0].nom;
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
    this.afterpageLoadedCb++;
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
    this.demandeCessionService.patchConvention(this.demandeCession.idDemande, body).subscribe()
  }

}