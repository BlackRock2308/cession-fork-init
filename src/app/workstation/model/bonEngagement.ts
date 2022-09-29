export interface BonEngagement {
    idBonEngagement?:number;
    montantCreance?:number;
    reference?:number;
    naturePrestation?:String;
    natureDepense?:String;
    objetDepense?:String;
    bonEngagementFile?:File;
    dateBonEngagement?:Date;
    imputation ?: String;
    identificationComptable ?: String;
}
