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
@Component({
    selector: 'app-tache-analyse',
    templateUrl: './tache-analyse.component.html',
    styleUrls: ['./tache-analyse.component.scss'],
    providers: [DialogService,MessageService]
})
export class TacheAnalyseComponent implements OnInit {

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

    observation:Observation;

    constructor( private router: Router,
        private demandeCessionService: DemandesCessionService,
        private demandesAdhesionService: DemandesAdhesionService,public dialogService: DialogService,
         private documentService: FileUploadService, private messageService: MessageService, 
         private demandeAdhesionService: DemandesAdhesionService,
         private breadcrumbService: BreadcrumbService,
         private observationService:ObservationService,
         private tokenStorage:TokenStorageService) {
            this.breadcrumbService.setItems([
                { label: 'Liste de demandes à analyser'},
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
            console.log(this.demandeCession)
          })
      
        //get all documents from the demand
        this.documents=this.documents.concat(this.demandeCession.bonEngagement.documents);
        this.documents=this.documents.concat(this.demandeCession.pme.documents);
        this.documents=this.documents.concat(this.demandeCession.documents);

        // this.demandeCession.bonEngagement.documents.forEach(document => {
        //     this.documentService.dowloadFile(document.urlFile).subscribe(data => {
        //         this.documents=this.documents.concat(data);
        //         console.log(this.documents)
        //     });
        // });

        // this.demandeCession.pme.documents.forEach(document => {
        //     this.documentService.dowloadFile(document.urlFile).subscribe(data => {
        //         this.documents=this.documents.concat(data);
        //         console.log(this.documents)
        //     });
        // });

        // this.demandeCession.documents.forEach(document => {
        //     this.documentService.dowloadFile(document.urlFile).subscribe(data => {
        //         this.documents=this.documents.concat(data);
        //         console.log(this.documents)
        //     });
        // });

        

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
        console.log('nom: ' + document.nom + 'path ' +document.urlFile )
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
       
        this.demandeCessionService.validateAnalyseRisque(this.demandeCession.idDemande).subscribe(
            (response) => {},
            (error) => {},
            () => {
                this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
                this.observation.statut={}
                this.observation.demandeid = this.demandeCession.idDemande;
                this.observation.statut.libelle =StatutEnum.nonRisquee;
                this.observationService.postObservation(this.observation).subscribe(data => console.log(data))

                Swal.fire({
                    position: 'center',
                      icon: 'success',
                      showConfirmButton: false,
                      timer: 1500,
                      html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>La demande a bien été completée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
                      color:"#203359",
                      confirmButtonColor:"#99CC33",
                      confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
                      allowOutsideClick:false,
                      
                    }).then(() => {
                     
                        this.router.navigate(['workstation/cdmp/analyse_risque'])
                    })
            }
            
        )
      
    
        
    
    
          
    }

    onSubmitRejet() {
       
    
        Swal.fire({
            position: 'center',
            title: 'Etes-vous sur de vouloir rejeter la demande?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
          color:"#203359",
          confirmButtonColor:"#99CC33",
          confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
          allowOutsideClick:false,
          
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['workstation/cdmp/analyse_risque'])
            this.demandeCessionService.rejeterAnalyseRisque(this.demandeCession.idDemande).subscribe(
                (response) => {},
                    (error) => {},
                    () => {
                        this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
                        this.observation.statut={}                        
                        this.observation.demandeid = this.demandeCession.idDemande;
                        this.observation.statut.libelle =StatutEnum.risquee;
                        this.observationService.postObservation(this.observation).subscribe(data => console.log(data))

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
       
      this.demandeCessionService.demanderComplement(this.demandeCession.idDemande).subscribe(
        (response) => {},
            (error) => {},
            () => {
                this.observation.utilisateurid = this.tokenStorage.getUser().idUtilisateur;
                this.observation.statut={}                
                this.observation.demandeid = this.demandeCession.idDemande;
                this.observation.statut.libelle =StatutEnum.complementRequis;
                this.observationService.postObservation(this.observation).subscribe(data => console.log(data))

                Swal.fire({
                    html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>Un complement des dossiers soumis sera demandé a la PME.</p> <br><p style='font-size: large;font-weight: bold;'></p>",
                    color:"#203359",
                    confirmButtonColor:"#99CC33",
                    confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
                    allowOutsideClick:false,
                    
                  }).then((result) => {
                    if (result.isConfirmed) {
                      this.router.navigate(['workstation/cdmp/analyse_risque'])
                    }})
            }
      )
    
        
    
          
    }

}
