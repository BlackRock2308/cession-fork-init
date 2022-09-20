
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
    datePaiement?: Date;
    montant?: number;
    payer?: string;
}