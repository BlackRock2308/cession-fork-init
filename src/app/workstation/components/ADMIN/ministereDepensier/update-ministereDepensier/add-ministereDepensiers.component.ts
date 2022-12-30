import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { MinistereDepensier } from "src/app/workstation/model/MinistereDepensier";
import { MinistereDepensierService } from "src/app/workstation/service/ministereDepensier/ministereDepensierService.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-update-ministereDepensier",
  templateUrl: "./update-ministereDepensier.component.html",
  styleUrls: ["./update-ministereDepensier.component.scss"],
  providers: [MessageService],
})
export class UpdateMinistereDepensierComponent implements OnInit {
  form!: FormGroup;
  ministereDepensier: MinistereDepensier;
  message:string;
  submit: boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private ministereDepensierService : MinistereDepensierService,
    public activeModal: NgbActiveModal,
    public ref: DynamicDialogRef,
    private servicemsg: MessageService,
    public config: DynamicDialogConfig,
  ) {
  }

  ngOnInit() {
    this.message = "Champ obligatoire";
    this.form = this.formBuilder.group({
      code: ['', Validators.required],
      libelle: ['', Validators.required]
    });
  }
  dismiss() {
    this.ref.close(null);
  }

  

  onSubmitForm() {
    this.submit = true;
    if (this.form.invalid) {
      return;
    }  
    this.ministereDepensierService
      .updateMinistereDepensier(this.ministereDepensier)
      .subscribe((res: any) => {
        this.dismiss();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Paiement CDMP enregistré avec succès.',
          showConfirmButton: false,
          timer: 1500
        })
         
      }),
      (error) => {
        this.servicemsg.add({
          key: "tst",
          severity: "danger",
          summary: "Erreur",
          detail: "Erreur, CDMP non payé",
        });   
  }
}

}
