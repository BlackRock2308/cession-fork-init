export interface Convention {

    idConvention?:number,
    nom?:string,
    statut?:String,
    date_soumission?: string,
    conv_file ?:File,
    path ?: string,
    valeurDecote : number;
    remarqueJuriste?:string;
}
