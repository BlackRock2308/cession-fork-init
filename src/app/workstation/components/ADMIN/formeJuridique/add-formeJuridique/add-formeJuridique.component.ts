import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";import { FormeJuridique } from "src/app/workstation/model/formeJuridique";
import { FormeJuridiqueService } from "src/app/workstation/service/formeJuridique/formeJuridiqueService.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-formeJuridique",
  templateUrl: "./add-formeJuridique.component.html",
  styleUrls: ["./add-formeJuridique.component.scss"],
  providers: [MessageService],
})
export class AddFormeJuridiqueComponent implements OnInit {
  form!: FormGroup;
  formeJuridique: FormeJuridique={};
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
      .addFormeJuridique(this.formeJuridique)
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
          title: 'Forme enregistré avec succès.',
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
