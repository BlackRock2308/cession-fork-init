import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import Swal from "sweetalert2";
import { Convention } from "../../model/convention";
import { Observation } from "../../model/observation";
import { ConventionService } from "../../service/convention/convention.service";

@Component({
  selector: "app-convention-signer",
  templateUrl: "./convention-signer.component.html",
  styleUrls: ["./convention-signer.component.scss"],
})
export class ConventionSignerComponent implements OnInit {
  selectedCONVENTIONFiles: File | null = null;
  form!: FormGroup;
  convention: any;
  codePIN: string;
  idUser:any;
  decote : number;
  observation: Observation = {};
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private tokenStorage: TokenStorageService,
    private conventionService: ConventionService
  ) {
    this.idUser = this.tokenStorage.getUser().idUtilisateur;
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      convention: ["", Validators.required],
      codePIN: ["", Validators.required],
      decote: [""],
    });
    this.convention = this.config.data.convention;
  }

  dismiss() {
    this.ref.close();
  }

  //envoie du formulaire
  onSubmit() {
    this.ref.close();

    Swal.fire({
      title: "Voulez vous signer la convention?",
      showDenyButton: true,
      confirmButtonText: "Oui",
      denyButtonText: `Annuler`,
      confirmButtonColor: "#99CC33FF",
      denyButtonColor: "#981639FF",
      cancelButtonColor: "#333366FF",
      customClass: {
        actions: "my-actions",
        denyButton: "order-1 right-gap",
        confirmButton: "order-2",
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.signerConventionDG();
      } else if (result.isDenied) {
        Swal.fire("Signature annulée", "", "info");
      }
    });
  }

   signerConventionDG() {
    this.codePIN = this.form.value["codePIN"];
    if (this.form.value["decote"] !== null) {
      this.conventionService
        .updateDecote(this.convention.idConvention, this.form.value["decote"])
        .subscribe((res: any) => {
          console.log(res);
        });        
      this.conventionService.signerConventionDG( this.codePIN, this.idUser, this.convention.idConvention
        )
        .subscribe((response: any) => {
          if (response) {
            Swal.fire({
              position: "center",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              html: "<p style='font-size: large;font-weight: bold;justify-content:center;'>Convention Signée avec succès.</p><br><p style='font-size: large;font-weight: bold;'></p>",
              color: "#203359",
              confirmButtonColor: "#99CC33",
              confirmButtonText:
                '<i class="pi pi-check confirm succesButton"></i>OK',
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate([
                  "workstation/comptable/convention_cession",
                ]);
              }
            });

            setTimeout(() => {
              location.reload();
            }, 1600);
          } else {
            Swal.fire({
              icon: "error",
              title: "Erreur",
              text: "Le code pin saisi est incorrect!",
              confirmButtonText: '<i class="pi pi-check"></i>OK',
              confirmButtonColor: "#99CC33FF",
            });
          }
        });
    }
  }
}
