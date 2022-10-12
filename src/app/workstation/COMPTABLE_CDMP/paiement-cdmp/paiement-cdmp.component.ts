import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUploadService } from 'src/app/workstation/service/fileUpload.service';
import Swal from 'sweetalert2';
import { Document } from '../../model/document';

@Component({
  selector: 'app-paiement-cdmp',
  templateUrl: './paiement-cdmp.component.html',
  styleUrls: ['./paiement-cdmp.component.scss']
})
export class PaiementCDMPComponent implements OnInit {
  
  selectedFiles: File[]=[];
  selectedFile?:File;
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
  modePaiment: any = null;
  documents: Document[] = [];
  document: Document;
  documentForm: FormGroup;
  constructor(private router : Router ,public activeModal: NgbActiveModal, private uploadFileService: FileUploadService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  dropdownItems = [
    { name: 'Sélectionner', code: '' },
    { name: 'Chèque', code: 'CHEQUE' },
    { name: 'Espèce', code: 'ESPECE' },
    { name: 'Virement', code: 'VIREMENT' }
];
  ngOnInit() {

  }
  dismiss() {
    this.ref.close();
  }

  handleClick() {
    document.getElementById('upload-file').click();
  }

  //sélectionner le fichier 
  selectFile(files: any): void {
    this.selectedFiles = files.target.files[0];
    console.log(this.selectedFiles);
  }


  onSubmitForm() {

    this.ref.close();

    Swal.fire({

      html:"<p style='font-size: large;font-weight: bold;justify-content:center;'>Le paiement a bien été effectué.</p><br><p style='font-size: large;font-weight: bold;'></p>",
      color:"#203359",
      confirmButtonColor:"#99CC33",
      confirmButtonText: '<i class="pi pi-check confirm succesButton"></i>OK',
      allowOutsideClick:false,
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['workstation/comptable/list-paiements-cdmp'])
      }})
    }
 
 
}