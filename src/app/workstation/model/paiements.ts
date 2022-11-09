import { Statut } from "./statut";

export interface Paiements {
  idPaiement?: number;

  montantRecuCDMP?: number;

  soldePME?: number;

  demandeId?: number;

  raisonSocial?: string;

  nomMarche?: string;

  montantCreance?: number;

  statutPme?: Statut;
  statutCDMP?:Statut;

  demandecessionid?:number;
}
