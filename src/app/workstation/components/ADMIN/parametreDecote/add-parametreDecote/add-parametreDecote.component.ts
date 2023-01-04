import { Component, Inject, Input, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ParametrageDecote } from "src/app/workstation/model/parametreDecote";
import { ParametrageDecoteServices } from "src/app/workstation/service/parametrageDecote/parametrageDecoteServices.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-parametreDecote",
  templateUrl: "./add-parametreDecote.component.html",
  styleUrls: ["./add-parametreDecote.component.scss"],
  providers: [MessageService],
})
export class AddParametrageDecoteComponent implements OnInit {
  form!: FormGroup;
  parametrageDecote: ParametrageDecote={};
  message:string;
  submit: boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private parametrageDecoteServices : ParametrageDecoteServices,
    public activeModal: NgbActiveModal,
    public ref: DynamicDialogRef,
    private servicemsg: MessageService,
    public config: DynamicDialogConfig,
  ) {
  }

  ngOnInit() {
    this.message = "Champ obligatoire";
    this.form = this.formBuilder.group({
      decoteValue: ['', [Validators.required, this.matchValuesDecote()]],
      borneSup: ['', Validators.required],
      borneInf: ['', Validators.required]
    });
  }
  dismiss() {
    this.ref.close();
  }

  matchValuesDecote(): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value && !!control.value &&
        control.value <= 100 
        ? null
        : { isMatching: false };
    };
  }

  onSubmitForm() {
    this.submit = true;
    if (this.form.invalid) {
      return;
    }  
    this.parametrageDecote.decoteValue = this.parametrageDecote.decoteValue/100;
    this.parametrageDecoteServices
      .addParametrageDecote(this.parametrageDecote)
      .subscribe((res: any) => {
        this.dismiss();
        if(res.status == "409" || res.status == "503"){
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Vérifiez vos bornes',
          })
         }else{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Décote enregistré avec succès.',
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
