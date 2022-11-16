import { Documents } from "./document";
import { Paiements } from "./paiements";

export interface DetailsPaiement {
  id?: number;

  modePaiement?: string;

  datePaiement?: Date;

  comptable?: string;

  montant?: number;

  reference?: string;

  typepaiement?: string;

  paiementDto?: Paiements;

  documents?: Documents[];
}
