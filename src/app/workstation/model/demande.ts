import { BonEngagement } from "./bonEngagement";
import { PME } from "./pme";
import { Document, Documents } from './document';
import { Observation } from "./observation";

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
export class DemandeCession {
    
    idDemande?:number;
    pme?:PME;
    bonEngagement?:BonEngagement;
    observations?: Observation[];
    conventions?: Convention[];
    statut?:string;
    dateDemandeCession?: Date;
    numeroDemande ?: string;
    minister?: String;
    constructor(obj: any = {}) {
        this.idDemande= obj.idDemande;
        this.pme= obj.pme;
        this.bonEngagement= obj.bonEngagement;
        this.observations= obj.observations;
        this.statut= obj.statut;
        this.dateDemandeCession= obj.dateDemandeCession;
        this.numeroDemande= obj.numeroDemande;
        this.minister= obj.minister;
    }    
}

export interface Convention {

    id?:number,
    dateConvention?:Date,
    decote?:string,
    modePaiement?:String;
    documents?: Document[];
}

export interface DemandeNantissemantInfo{
    id?:number;
    refBE?:String;
    ninea?:String;
    date_soumission?:Date;
}

