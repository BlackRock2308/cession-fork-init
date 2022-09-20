import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { fileUploadService } from 'src/app/workstation/service/fileUpload.service';
import { Document } from '../../model/document';

@Component({
  selector: 'app-paiement-pme',
  templateUrl: './paiement-pme.component.html',
  styleUrls: ['./paiement-pme.component.scss']
})
export class PaiementPMEComponent implements OnInit {
  
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
  constructor(public activeModal: NgbActiveModal, private uploadFileService: fileUploadService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

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

  selectFile(files: any): void {
    
    this.document=this.documentForm.value;
    this.document.file=files.target.files[0];
    this.documents.push(this.document);
    files.target.files=null;
    console.log(this.documents)
        
  }
 
}