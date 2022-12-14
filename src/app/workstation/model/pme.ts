import { EmailValidator } from "@angular/forms";

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
    formeJuridique?:string;
    centreFiscal?:string;
    dateImmatriculation?:Date;
    adressePME?:string;
    hasninea?:boolean;
    isactive?:boolean;
    denomination?: string ,
    formejuridique?: string,
    enseigne?: string,
    localite?: string,
    controle?: number,
    activitePrincipale ?: string,
    registre ?: string,
    prenomRepresentant ?:string,
    nomRepresentant ?:string,
    dateCreation ?: Date,
    effectif?: number,
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
