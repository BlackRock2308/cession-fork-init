import { BonEngagement } from "./bonEngagement";
import { PME } from "./pme";
import { Document } from './document';

export interface DemandeAdhesion {

    id?:number;
    ninea?:string;
    rccm?:string;
    statut?:String;
    dateDemandeAdhesion?:Date;
    numero_demande ?: number;
    documents?: Document[];
    pmeId?: number;
}
export interface DemandeCession {

    id?:number,
    pme?:PME,
    referenceBE?:string;
    raisonSocial?:string;
    ninea?:string;
    convention?:Convention,
    statut?:string;
    dateDemande?: Date,
    BE ?:BonEngagement,
    numeroDemande ?: number,
    nantissement ?: string,
    nomMarche ?: string
   
}

export interface Convention {

    id?:number,
    dateConvention?:Date,
    decote?:string,
    modePaiement?:String;
}

export interface DemandeNantissemantInfo{
    id?:number;
    refBE?:String;
    ninea?:String;
    date_soumission?:Date;
}

