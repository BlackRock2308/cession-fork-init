import { Statut } from "./statut";

export interface Paiements {
  idPaiement?: number;

  montantRecuCDMP?: number;

  soldePME?: number;

  demandeId?: number;

  raisonSocial?: string;

  nomMarche?: string;

  montantCreance?: number;

  statutDto?: Statut;

  demandecessionid?:number;
}
