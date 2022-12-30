import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { CentreDesServicesFiscaux } from "src/app/workstation/model/centreDesServicesFiscaux";
import { CentreDesServicesFiscauxService } from "src/app/workstation/service/centreDesServicesFiscaux/centreDesServicesFiscauxService.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-CentreDesServicesFiscaux",
  templateUrl: "./add-CentreDesServicesFiscaux.component.html",
  styleUrls: ["./add-CentreDesServicesFiscaux.component.scss"],
  providers: [MessageService],
})
export class AddCentreDesServicesFiscauxComponent implements OnInit {
  form!: FormGroup;
  centreDesServicesFiscaux: CentreDesServicesFiscaux={};
  message:string;
  submit: boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private centreDesServicesFiscauxService : CentreDesServicesFiscauxService,
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
    this.centreDesServicesFiscauxService
      .addCentreDesServicesFiscaux(this.centreDesServicesFiscaux)
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
          title: 'Centre des services fiscaux enregistré avec succès.',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          location.reload()
        },1600);
      }
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
