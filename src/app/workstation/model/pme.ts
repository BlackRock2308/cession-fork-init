import { EmailValidator } from "@angular/forms";

export interface PME {
    pmeId?:number;
    ninea?:string;
    rccm?:string;
    email?:string;
    nineaFile?:any;
    rccmFile?:any;
    denommination?:string;
    representantLegal?:string;
    formuleJuridique?:string;
    cniRepresentant?:string;
    centrefiscal?:string;
    dateImmatriculation?:Date;
    adresse?:string;
    telephone?:string;
    nineaValide?:boolean;
    pmeActive?:boolean;
}
