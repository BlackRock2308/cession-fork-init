import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
import { Profile } from 'src/app/workstation/model/profil';
import { PME } from '../../model/pme';
import { DemandesAdhesionService } from '../../service/demandes_adhesion/demandes-adhesion.service';
import { CodeComponent } from './code/code.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  providers:[
    DialogService
  ]
})
export class ProfilComponent implements OnInit {

  profil: Profile; 
  nom: string;
  prenom: string;
  email: string;
  adressePME : string;
  telephonePME : string;
  poste: string;
  informationsForm: any;
  code: string;
  updateCodePin:boolean
  demande: any;
  pme: PME;

  constructor(public dialogService: DialogService,
    private tokenStorage:TokenStorageService,
    private formBuilder: FormBuilder,

    private demandeAdhesionService: DemandesAdhesionService,
    private breadcrumbService: BreadcrumbService,
    ) { 
      
      this.informationsForm = this.formBuilder.group({
        telephonePME: [''],
        adressePME: [''],
        code : ['']
      });
      if(localStorage.getItem('profil')=='DRC'){
        this.breadcrumbService.setHome({ label: 'Dashboard' , icon: 'pi pi-home', routerLink: ['cdmp/dashboard'] })
      }
      if(localStorage.getItem('profil')=='DSEAR'){
        this.breadcrumbService.setHome({ label: 'Dashboard' ,icon: 'pi pi-home', routerLink: ['cdmp/dashboard'] })
      }
      if(localStorage.getItem('profil')=='JURISTE'){
        this.breadcrumbService.setHome({  label: 'Conventions' ,icon: 'pi pi-home', routerLink: ['comptable/convention_cession'] })
      }
      if(localStorage.getItem('profil')=='PME'){
        this.breadcrumbService.setHome({ label: 'Demandes de cession' ,icon: 'pi pi-home', routerLink: ['pme/demandes_en_cours'] })
      }
      if(localStorage.getItem('profil')=='DAF'){
        this.breadcrumbService.setHome({label: 'Dashboard' ,  icon: 'pi pi-home', routerLink: ['cdmp/dashboard'] })
      }
      if(localStorage.getItem('profil')=='DG'){
        this.breadcrumbService.setHome({label: 'Dashboard' , icon: 'pi pi-home', routerLink: ['cdmp/dashboard'] })
      }
      if(localStorage.getItem('profil')=='ORDONNATEUR'){
        this.breadcrumbService.setHome({ label: 'Conventions' ,icon: 'pi pi-home', routerLink: ['ordonnateur/conventions'] })
      }

    }
    

  ngOnInit() {

    this.demandeAdhesionService.getDemandeObs().subscribe(data => {
      this.demande = data;
      this.pme = this.demande.pme
      console.log(this.pme)

    })

    this.updateCodePin=this.tokenStorage.getUser().updateCodePin
    this.nom = this.tokenStorage.getUser().nom;
    this.prenom = this.tokenStorage.getUser().prenom;
    this.poste = localStorage.getItem('profil');
    this.email = this.tokenStorage.getUser().email;
    this.code = this.tokenStorage.getUser().codePin;
    this.telephonePME = this.tokenStorage.getPME().telephonePME;
    this.adressePME = this.tokenStorage.getPME().adressePME;

  }
  modifierCode(){
      const ref = this.dialogService.open(CodeComponent, {
        header: "Changer le code",
        width: '40%',
        height: 'calc(50% - 80px)',
        baseZIndex: 50
      });
     
    }


}