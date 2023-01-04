import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { MinistereDepensier } from "src/app/workstation/model/ministereDepensier";
import { MinistereDepensierService } from "src/app/workstation/service/ministereDepensier/ministereDepensierService.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-ministereDepensier",
  templateUrl: "./add-ministereDepensiers.component.html",
  styleUrls: ["./add-ministereDepensiers.component.scss"],
  providers: [MessageService],
})
export class AddMinistereDepensierComponent implements OnInit {
  form!: FormGroup;
  ministereDepensier: MinistereDepensier ={};
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
      .addMinistereDepensier(this.ministereDepensier)
      .subscribe((res: any) => {
        this.dismiss();
        if(res.status == "409"){
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Ce code existe',
          })
         }else{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ministère enregistré avec succès.',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            location.reload()
          },1600);
         }
      }),
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Création échouée',
        }) 
  }
}

}
