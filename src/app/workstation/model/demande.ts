export interface DemandeAdhesion {

    id?:number,
    ninea?:string,
    rccm?:string,
    statut?:String;
    date_soumission?: string,
    denomination ?:String,
    interdiction ?: String,
    numero_demande ?: number,
    ATD?: String,
    nantissement ?: String,
    nineaFile?:File,
    rccmFile?:File 
}
