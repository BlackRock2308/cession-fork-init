import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PME } from 'src/app/workstation/model/pme';
import { AdhesionService } from 'src/app/workstation/service/adhesion/adhesion.service';
import { Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { MenuService } from 'src/app/core/app-layout/side-menu/app.menu.service';
import { PmeService } from 'src/app/workstation/service/pme/pmeservice.service';
import { Documents } from 'src/app/workstation/model/document';
import { VisualiserDocumentComponent } from '../../CDMP/visualiser-document/visualiser-document.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DocumentService } from 'src/app/workstation/service/document/document.service';
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

  selectedFiles: File[] = [];
  selectedFile?: File;
  documentForm: FormGroup;
  documents: Document[] = [];
  document: Document;
  cols: any[];
  selectedProducts: Document[];
  typesDocument: any[];
  filteredtypeDocument: any[];
  selectedTypeDocument: string;
  items: MenuItem[];
  home: MenuItem;
  documentes: any[];

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adhesionService: AdhesionService,
    public renderer: Renderer2, private menuService: MenuService,
    private primengConfig: PrimeNGConfig,
    public app: AppComponent,
    private pmeService: PmeService,
    public dialogService: DialogService,
    private documentService: DocumentService
  ) { }

  ngOnInit(): void {
    this.pmeService.getTypesDocument().subscribe(data => {
      this.typesDocument = data;
      this.typesDocument.push({ nom: "Autres..." })
      console.log(this.typesDocument)
    })
    this.documentService.getDeocuments().subscribe(data => {
      this.documentes = data
    });

    this.documentForm = this.formBuilder.group({
      typeDocument: [''],
      file: [''],
    });
    this.items = [
      { label: 'Nouvelle demande' }
    ];

    this.home = { icon: 'pi pi-home', url: '/#/workstation/cdmp/dashboard' };


  }

  //ajouter le fichier sélectionné au répertoire de fichier
  selectFile(files: any): void {

    this.document = this.documentForm.value;
    this.document.file = files.target.files[0];
    this.documents.push(this.document)
    console.log(this.documents)

  }

  //ouvrir la boite de dialogue du répertoire
  handleClick() {
    document.getElementById('upload-file').click();
  }

  //envoie du formulaire
  onSubmit() {



    // arrêter si le formulaire est invalide
    if (this.documentForm.invalid) {
      return;
    }

    for (var i = 0; i < this.documents.length; i++) {
      this.enregistrerDocuments(this.documents[i]);


    }


  }


  //enregistrement du pme avec l'appel du service d'enregistrement
  private enregistrerDocuments(document: Document) {
    //fonction à continuer 
    console.log(this.documents);
    /*this.adhesionService.postPME(this.pme)
        .subscribe(() => {
           })*/

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
    var myIndex = this.documents.indexOf(document);
    if (myIndex !== -1) {
      this.documents.splice(myIndex, 1);
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
}

interface Document {

  type?: String;
  file?: File;
}

interface typeDocument {
  nom?: String;
}

