import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PME } from 'src/app/workstation/model/pme';
import { Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem,} from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import { Documents } from 'src/app/workstation/model/document';
import { VisualiserDocumentComponent } from '../../CDMP/visualiser-document/visualiser-document.component';
import { DialogService } from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { DemandeAdhesion, DemandeCession  } from 'src/app/workstation/model/demande';
import { BonEngagement } from 'src/app/workstation/model/bonEngagement';
import { HttpErrorResponse } from '@angular/common/http';
import { DemandesCessionService } from 'src/app/workstation/service/demandes_cession/demandes-cession.service';
import { BonEngagementService } from 'src/app/workstation/service/bonEngagement/bon-engagement.service';
import { DocumentService } from 'src/app/workstation/service/document/document.service';
import { concatMap } from 'rxjs/operators';
import { FileUploadService } from 'src/app/workstation/service/fileUpload.service';

@Component({
  selector: 'app-nouvelle-demande',
  templateUrl: './nouvelle-demande.component.html',
  styleUrls: ['./nouvelle-demande.component.scss'],
  providers: [DialogService],
  animations: [
    trigger('mask-anim', [
      state('void', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 0.8
      })),
      transition('* => *', animate('250ms cubic-bezier(0, 0, 0.2, 1)'))
    ])
  ],
})
export class NouvelleDemandeComponent implements OnInit {

  refBE: number;
  nomMarche: String;
  demandeCession :DemandeCession;
  bonEngagement : BonEngagement;
  selectedFiles: File[] = [];
  selectedFile?: File;
  documentForm: FormGroup;
  documents: File[] = [];
  document : Document={};
  cols: any[];
  selectedProducts: Document[];
  typesDocument: any[];
  filteredtypeDocument: any[];
  selectedTypeDocument: string;
  items: MenuItem[];
  home: MenuItem;
  documentPresentation: Document[]=[];

  rightPanelClick: boolean;

  rightPanelActive: boolean;

  menuClick: boolean;

  staticMenuActive: boolean;

  menuMobileActive: boolean;

  megaMenuClick: boolean;

  megaMenuActive: boolean;

  megaMenuMobileClick: boolean;

  megaMenuMobileActive: boolean;

  topbarItemClick: boolean;

  topbarMobileMenuClick: boolean;

  topbarMobileMenuActive: boolean;

  sidebarActive: boolean;

  activeTopbarItem: any;

  topbarMenuActive: boolean;

  menuHoverActive: boolean;

  configActive: boolean;


  selectedBONFiles: File | null = null;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  form!: FormGroup;
  submitted = false;
  pme: PME;

idBE:number;

  constructor(
    private router : Router,
    private formBuilder: FormBuilder,
    public renderer: Renderer2,
    public app: AppComponent,
    private pmeService: PmeService,
    private uploadfileservice : FileUploadService,
    private demandeCessionService : DemandesCessionService,
    private bonEngagementService : BonEngagementService,
    private documentService : DocumentService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private breadcrumbService: BreadcrumbService
  ) {   this.breadcrumbService.setItems([
    { label: 'Demandes' },
    { label: 'Nouvelle demande', routerLink: ['pme/new_demande'] }
]); 
   
   this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink: ['pme/demandes_en_cours'] })

}





  ngOnInit(): void {
    this.typesDocument=[
      {
        "type": "Autre",
        "nom": "Document du marché"
      },
      {
        "type": "BE",
        "nom": "Bon engagement"
      }
    ]

    
  
    this.documentForm = this.formBuilder.group({
      typeDocument: [''],
      file: [''],
      refBE : ['',[Validators.required]],
      nomMarche  : ['',[Validators.required]]  });
  }

  get f(){
    return this.documentForm.controls;
  }
  //ajouter le fichier sélectionné au répertoire de fichier
  selectFile(files: any): void {

    this.document={}
    this.document.type = this.documentForm.value['typeDocument'];
    this.document.file = files.target.files[0];
    this.documents.push(files.target.files[0]);
    this.documentPresentation.push(this.document);
    console.log(this.documentPresentation)
    console.log(this.documents)


  }

  //ouvrir la boite de dialogue du répertoire
  handleClick() {
    document.getElementById('upload-file').click();
  }

 

  onSubmit(){
  

    console.log(this.bonEngagement);
    let body={
    reference:this.documentForm.value['refBE'],
    nomMarche:this.documentForm.value['nomMarche']
    };
    console.log(body);
         
   
 this.postDemandeCession();

 Swal.fire({
  position: 'center',
    icon: 'success',
    showConfirmButton: false,
    timer: 1500,
    html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>Votre demande a bien été envoyée.</p><br><p style='font-size: large;font-weight: bold;'></p>",
    color:"#203359",
    confirmButtonColor:"#99CC33",
    confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
    allowOutsideClick:false,
    
  }).then(() => {
   
      this.router.navigate(['workstation/pme/demandes_en_cours'])
  })


  }
  
  
  async postBE(){
    let body={
      reference:this.documentForm.value['refBE'],
      nomMarche:this.documentForm.value['nomMarche']
      };
    var response=await this.bonEngagementService.addBE(body).toPromise()
    this.idBE=response.idBonEngagement
        
    }
  

  async postDemandeCession(){
    
    await this.postBE().then(()=>{
      console.log(this.idBE)
      this.demandeCessionService.addDemandeCession({
        "bonEngagement": {
            "id":this.idBE
        }
    }).subscribe((result)=>{
        console.log(result)
        })
        for (var i = 0; i < this.documents.length; i++) {
        this.uploadfileservice.uploadFile('/bonEngagement/', this.idBE, this.documents[i], this.documentForm.value['typeDocument']).subscribe(
          )
        }
        console.log("finish")
    })
    
      
    
    
  }
  
 


 

  

  filtertypeDocument(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.typesDocument.length; i++) {
      const typeDocument = this.typesDocument[i];
      if (typeDocument.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(typeDocument);
      }
    }

    this.filteredtypeDocument = filtered;
  }

  
  delete(document:Document){
    var myIndex = this.documents.indexOf(document.file);
    var myIndex2 = this.documentPresentation.indexOf(document.file);
    if (myIndex !== -1) {
      this.documents.splice(myIndex, 1);
  }
  if (myIndex !== -1) {
    this.documentPresentation.splice(myIndex2,1)
}
  console.log(this.documents)
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
  onReject() {
    this.messageService.clear('c');
}

 
}

interface Document {

  type?: String;
  file?: File;
}

interface typeDocument {
  nom?: String;
}

