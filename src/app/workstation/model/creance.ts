export interface Creance {

    idCreance?:number;
    ninea?:string; 
    rccm?:string; 
    raisonSocial?:string; 
    typeMarche?:string; //Bon engagement
    nomMarche?;string; //Bon engagement
    montantCreance?:number; //Bon engagement
    montantDebourse?:number; //Bon engagement
    montantRembourse?:number; //Bon engagement
    decote?:number; //Convention
    soldePME?:number; //Paiement
    soldeSICA?:number; //Paiement
    statut?:string; //DemandeCession
    dateDemandeCession?:Date; //DemandeCession
    dateMarche?:Date; //DemandeCession
}
