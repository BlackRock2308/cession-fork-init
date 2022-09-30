import { BonEngagement } from "./bonEngagement";
import { PME } from "./pme";

export interface DemandeAdhesion {

    id?:number,
    ninea?:string,
    rccm?:string,
    statut?:String;
    date_soumission?:Date,
    denomination ?:String,
    interdiction ?: String,
    numero_demande ?: number,
    ATD?: String,
    nantissement ?: String,
    nineaFile?:File,
    rccmFile?:File 
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
    nantissement ?: string
   
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

