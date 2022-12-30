import { Component,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";import { FormeJuridique } from "src/app/workstation/model/formeJuridique";
import { FormeJuridiqueService } from "src/app/workstation/service/formeJuridique/formeJuridiqueService.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-update-formeJuridique",
  templateUrl: "./update-formeJuridique.component.html",
  styleUrls: ["./update-formeJuridique.component.scss"],
  providers: [MessageService],
})
export class UpdateFormeJuridiqueComponent implements OnInit {
  form!: FormGroup;
  formeJuridique: FormeJuridique;
  message:string;
  submit: boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private formeJuridiqueService : FormeJuridiqueService,
    public activeModal: NgbActiveModal,
    public ref: DynamicDialogRef,
    private servicemsg: MessageService,
    public config: DynamicDialogConfig,
  ) {
  }

  ngOnInit() {
    this.message = "Champ obligatoire";
    this.formeJuridique = this.config.data.formeJuridique;
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
    this.formeJuridiqueService
      .updateFormeJuridique(this.formeJuridique)
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
          title: 'Forme juridique modifiée avec succès.',
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
