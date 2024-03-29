import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/workstation/model/product';
import { Document, Documents } from 'src/app/workstation/model/document';
import { Message,MenuItem, MessageService } from 'primeng/api';
import { DocumentService } from 'src/app/workstation/service/document/document.service';
import { PME } from 'src/app/workstation/model/pme';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { DemandeAdhesion } from 'src/app/workstation/model/demande';
import { DialogService } from 'primeng/dynamicdialog';
import { VisualiserDocumentComponent } from '../visualiser-document/visualiser-document.component';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { FileUploadService } from 'src/app/workstation/service/fileUpload.service';
import { Observation } from 'src/app/workstation/model/observation';
import { ObservationService } from 'src/app/workstation/service/observation/observation.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { StatutEnum } from 'src/app/workstation/model/statut-enum';
import { TimelineElement } from '../../observations/timeline-element';
@Component({
    selector: 'app-tache-analyse',
    templateUrl: './tache-analyse.component.html',
    styleUrls: ['./tache-analyse.component.scss'],
    providers: [DialogService,MessageService]
})
export class TacheAnalyseComponent implements OnInit {
    events1: TimelineElement[] = [];

    demandeCession: any;

    editNinea: PME;

    productDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    demande: DemandeAdhesion;
    products: Product[];
    documents: any[]=[];

    document: Document;
    product: Product;

    selectedProducts: Product[];

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    routeItems: MenuItem[];

    items: MenuItem[];
    home: MenuItem;
    msgs1: Message[];

    observation:Observation={};
    observationLibelle: string;

    constructor( private router: Router,
        private demandeCessionService: DemandesCessionService,
        private demandesAdhesionService: DemandesAdhesionService,public dialogService: DialogService,
         private documentService: FileUploadService, private messageService: MessageService, 
         private demandeAdhesionService: DemandesAdhesionService,
         private breadcrumbService: BreadcrumbService,
         private observationService:ObservationService,
         private tokenStorage:TokenStorageService) {
            this.breadcrumbService.setItems([
                { label: 'Liste de demandes à analyser' , routerLink :  'cdmp/analyse_risque'},
                { label: 'Analyse du risque',  routerLink: ['/cdmp/analyse_risque']  }
            ]);
            this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink:  ['cdmp/dashboard'] })
          }

    ngOnInit() {

        this.msgs1 = [
            {severity:'success', summary:'Success', detail:'Message Content'},
            {severity:'info', summary:'Info', detail:'Message Content'},
            {severity:'warn', summary:'Warning', detail:'Message Content'},
            {severity:'error', summary:'Error', detail:'Message Content'},
            {severity:'custom', summary:'Custom', detail:'Message Content', icon: 'pi-file'}
        ];
    
        this.demandeCessionService.getDemandeObs().subscribe(data => {
            this.demandeCession = data
            this.documents=this.documents.concat(this.demandeCession.bonEngagement.documents);
            this.documents=this.documents.concat(this.demandeCession.pme.documents);
            this.documents=this.documents.concat(this.demandeCession.documents);

            this.events1 = [];
            this.events1=this.demandeCession.observations
            this.events1.find(element=>{
              
                   if(!(element.libelle) || element.libelle=='' || element.libelle==undefined)
                     element.libelle="Pas d'observations."
                 })
            this.observationService.getObservationByDemandeCessionANDStatut(this.demandeCession.idDemande,this.demandeCession.statut.libelle).subscribe(
                data => {
                    this.observationLibelle=data.libelle
                })
          })
      
        this.cols = [
            { field: 'ninea', header: 'NINEA' },
            { field: 'rccm', header: 'RCCM' },
            { field: 'datesoumission', header: 'Date Soumission' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];
    }
    showViaService() {

        this.router.navigate(['/workstation/cdmp/analyse_risque']);
        this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});

    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    nineaValide(): any {
        const targetDiv = document.getElementById("actif");
        const btn = document.getElementById("oui");
        targetDiv.style.display = "flex";

    }

    visualiserDocument(document: any) {
        let nom = document.nom;
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

 
    onSubmit() {

        Swal.fire({
            title: 'Etes-vous sûr de vouloir valider la demande de cession?',
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
                setTimeout(() => {
                    location.reload()
                  }, 1000);
                  this.router.navigate(['workstation/cdmp/analyse_risque'])
                this.demandeCessionService.validateAnalyseRisque(this.demandeCession.idDemande).subscribe(
                    (response) => {},
                    (error) => {},
                    () => {
                        this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
                        this.observation.statut={}
                        this.observation.demandeid = this.demandeCession.idDemande;
                        this.observation.statut.libelle =StatutEnum.nonRisquee;
                        this.observationService.postObservation(this.observation).subscribe(data => data)
        
                        Swal.fire({
                            position: 'center',
                              icon: 'success',
                              showConfirmButton: false,
                              timer: 2500,
                              html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>La demande a bien été validée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
                              color:"#203359",
                              confirmButtonColor:"#99CC33",
                              confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
                              allowOutsideClick:false,
                              
                            }).then(() => {
                             
                                this.router.navigate(['workstation/cdmp/analyse_risque'])
                            })
                    }
                )            
            } else if (result.isDenied) {
              Swal.fire('Changements non effectués', '', 'info')
            }
          })  
    }

    onSubmitRejet() {
       
    
        Swal.fire({
            position: 'center',
            title: 'Etes-vous sûr de vouloir rejeter la demande?',
            icon: 'warning',
            showCancelButton: true,
            color:"#203359",
            confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>Oui',
            allowOutsideClick:false,
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
            setTimeout(() => {
                location.reload()
              }, 1000);
            this.router.navigate(['workstation/cdmp/analyse_risque'])
            this.demandeCessionService.rejeterAnalyseRisque(this.demandeCession.idDemande).subscribe(
                (response) => {},
                    (error) => {},
                    () => {
                        this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
                        this.observation.statut={}                        
                        this.observation.demandeid = this.demandeCession.idDemande;
                        this.observation.statut.libelle =StatutEnum.risquee;
                        this.observationService.postObservation(this.observation).subscribe(data => data)

                        Swal.fire(
                            'Rejetée!',
                            'La demande a bien été rejetée.',
                            'success'
                          )
                    }
              )
            
          }})
    
          
    }

    onSubmitComplements() {
        
        Swal.fire({
            title: 'Une demande de complément de dossier sera soumise à la PME. Voulez-vous poursuivre?',
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
                setTimeout(() => {
                    location.reload()
                  }, 1000);
                this.router.navigate(['workstation/cdmp/analyse_risque'])

                this.demandeCessionService.demanderComplement(this.demandeCession.idDemande).subscribe(
                    (response) => {},
                        (error) => {},
                        () => {
                            this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
                            this.observation.statut={}                
                            this.observation.demandeid = this.demandeCession.idDemande;
                            this.observation.statut.libelle =StatutEnum.complementRequis;
                            this.observationService.postObservation(this.observation).subscribe(data => data)
            
                            Swal.fire({
                                html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>Demande de complément de dossier soumise !</p> <br><p style='font-size: large;font-weight: bold;'></p>",
                                color:"#203359",
                                timer:2000,
                                confirmButtonColor:"#99CC33",
                                confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
                                allowOutsideClick:false,
                                showConfirmButton:false,
                                icon : 'success'
                                
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  
                                  this.router.navigate(['workstation/cdmp/analyse_risque'])
                                  
                                }})
                        }
                  )            } else if (result.isDenied) {
              Swal.fire('Demande non soumise', '', 'info')
            }
          })   
    }

}
