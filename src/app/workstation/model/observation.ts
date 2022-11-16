import { DemandeCession } from "./demande";
import { Statut } from "./statut";
import { StatutEnum } from "./statut-enum";

export interface Observation {
    id?:number;
    libelle?:String;
    dateObservation?:Date;
    adresse?:String;
    utilisateurid?:number;
    demandeid?:number;
    statut?:Statut;
}
