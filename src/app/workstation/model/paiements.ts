import { DetailsPaiement } from "./detailsPaiements";
import { Statut } from "./statut";

export interface Paiements {
  idPaiement?: number;
  cdmp?:number;
  montantRecuCDMP?: number;

  soldePME?: number;

  demandeId?: number;

  raisonSocial?: string;

  nomMarche?: string;

  montantCreance?: number;

  statutPme?: Statut;
  statutCDMP?:Statut;
  montantCreanceInitial?:number;
  demandecessionid?:number;
  details?: DetailsPaiement[];
}
