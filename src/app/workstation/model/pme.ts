import { EmailValidator } from "@angular/forms";

export interface PME {
    idPME?:number;
    ninea?:string;
    rccm?:string;
    raisonSocial?:string;
    email?:string;
    nineaFile?:any;
    rccmFile?:any;
    denommination?:string;
    formuleJuridique?:string;
    centrefiscal?:string;
    dateImmatriculation?:Date;
    adresse?:string;
    hasninea?:boolean;
    isactive?:boolean;
    denomination?: string ,
    formejuridique?: string,
    enseigne?: string,
    localite?: string,
    controle?: number,
    activiteprincipale ?: string,
    registre ?: string,
    representantLegal ?:string,
    date_creation ?: Date,
    effectif?: number,
    etablissements ?: number,
    chiffre?: number,
    cniRepresentant ?: number ,
    dateimmatriculation ?: Date,
    telephone ?: number,
    capitalsocial ?: string,
    nineaValide?:boolean;
    pmeActive?:boolean;
    atd?:boolean;
    nantissement?:boolean;
    interdictionBancaire?:boolean;
    identificationBudgetaire?:boolean;

}
