export interface BonEngagement {
    idBonEngagement?:number;
    nomMarche?: string;
    montantCreance?:number;
    reference :number;
    naturePrestation?:String;
    natureDepense?:String;
    objetDepense?:String;
    bonEngagementFile?:File;
    dateBonEngagement?:Date;
    imputation ?: String;
    identificationComptable ?: String;
    typeDepense?:string;
    modeReglement?:string;
    exercice?:string;
    designationBeneficiaire?:string;
    destinationAction?:string;
    destinationActivite?:string;
    dateSoumissionServiceDepensier?:Date;
    documents?: Document[];
}
