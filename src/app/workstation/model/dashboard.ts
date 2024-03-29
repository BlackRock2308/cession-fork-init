export interface StatistiqueDemandeCession {
    nombreDemandeAccepte?:number,
    nombreDemandeRejete?:number,
    mois?:Date
}


export interface StatistiquePaiementCDMP {
    year?:number;
    cmulRembourses?:ObjetMoisAndMontant[]; 
    cumulMontantCreance?:ObjetMoisAndMontant[]; 
    cumulSoldes?:ObjetMoisAndMontant[]; 
    cumulDecotes?:ObjetMoisAndMontant[]; 
}

export interface StatistiquePaiementPME {
    year?:number;
    cumulDebourses?:ObjetMoisAndMontant[]; 
    cumulMontantCreance?:ObjetMoisAndMontant[]; 
    cumulSoldes?:ObjetMoisAndMontant[]; 
    cumulDecotes?:ObjetMoisAndMontant[]; 
}


export interface ObjetMoisAndMontant{
    mois?:Date;
    montant?:number;
}