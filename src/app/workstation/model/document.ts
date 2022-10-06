export interface Documents {
    id?:number;
    nomDocument?:string;
    dateSoumission?:Date;
    typeDocument?:string;
    path:string;
    ninea ?: number;
    raisonSocial ?: string;
    refBE ?: string;
    refDemande ?: string;
    statut ?: string
    
}
export interface Document {

    id?:number,
    nom?:String,
    type?:String,
    dateSoumission?: string,
    file ?:File
    
}
