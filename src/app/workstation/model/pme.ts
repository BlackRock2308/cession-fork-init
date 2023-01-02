import { EmailValidator } from "@angular/forms";
import { CentreDesServicesFiscaux } from "./centreDesServicesFiscaux";
import { FormeJuridique } from "./formeJuridique";

export interface PME {
    idPME?:number;
    ninea?:string;
    rccm?:string;
    raisonSocial?:string;
    email?:string;
    nineaFile?:any;
    nombreEtablissementSecondaires?:number
    rccmFile?:any;
    autorisationMinisterielle ?: string
    denommination?:string;
    formeJuridique?:FormeJuridique;
    centreFiscal?:CentreDesServicesFiscaux;
    dateImmatriculation?:Date;
    adressePME?:string;
    hasninea?:boolean;
    isactive?:boolean;
    denomination?: string ,
    enseigne?: string,
    localite?: string,
    controle?: number,
    activitePrincipale ?: string,
    registre ?: string,
    prenomRepresentant ?:string,
    nomRepresentant ?:string,
    dateCreation ?: Date,
    effectifPermanent?: number,
    etablissements ?: number,
    chiffresDaffaires?: number,
    cniRepresentant ?: string ,
    dateimmatriculation ?: Date,
    telephonePME ?: string,
    capitalSocial ?: number,
    nineaValide?:boolean;
    pmeActive?:boolean;
    atd?:boolean;
    nantissement?:boolean;
    interdictionBancaire?:boolean;
    identificationBudgetaire?:boolean;
    utilisateurid?: number

}
