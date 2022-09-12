export interface Documents {
    id?:number;
    nomDocument?:string;
    dateSoumission?:Date;
    typeDocument?:string;
    path:string;
}
export interface Document {

    id?:number,
    nom?:String,
    type?:String,
    dateSoumission?: string,
    file ?:File
    
}
