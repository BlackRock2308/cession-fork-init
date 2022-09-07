import { EmailValidator } from "@angular/forms";

export interface BonEngagement {
    idBonEngagement?:number;
    montantCreance?:number;
    reference?:number;
    naturePrestation?:String;
    natureDepense?:String;
    bonEngagementFile?:File;
    dateBonEngagement?:Date;
    
}
