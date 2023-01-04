import { MinistereDepensier } from "./ministereDepensier";
import { Roles } from "./roles";

export interface Utilisateur {
    updateCodePin?:boolean;
    id?:number;
    nom?:String;
    prenom?:String;
    adresse?:String;
    codePin?:string;
    urlimagesignature?:String;
    telephone?:string;
    email?:String;
    urlmagerofil?:String;
    username ?: String;
    password ?: String;
    poste ?:String;
    minister?: MinistereDepensier;
    roles?:Roles[];
   
}
