import { Documents } from "./document";

export interface Paiements {

    id?:number;
    referenceBE?:string;
    raisonSocial?:string;
    ninea?:string;
    totalMarche?:number;
    statut?:string;
    soldePME?: number;
    montantRecu ?:number;
    referencePaiement ?: string;
    modePaiement ?: string;
    datePaiement?: Date;
    montant?: number;
    payer?: string;
    document: Documents;
}