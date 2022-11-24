export interface Creance {

    idCreance?:number;
    ninea?:string; 
    rccm?:string; 
    raisonSocial?:string; 
    typeMarche?:string; //Bon engagement
    nomMarche?;string; //Bon engagement
    montantCreance?:number; //Bon engagement
    montantDebourse?:number; //Bon engagement
    montantRembourse?:number; //Bon engagement
    decote?:number; //Convention
    soldePME?:number; //Paiement
    soldeSICA?:number; //Paiement
    statut?:string; //DemandeCession
    dateDemandeCession?:Date; //DemandeCession
    dateMarche?:Date; //DemandeCession
}
//{"content":[{"idCreance":7,"ninea":"123456789088","rccm":"SN DK 2898 Y 9989","raisonSocial":null,"typeMarche":null,"nomMarche":"Marche 1","montantCreance":0.0,"decote":null,"soldePME":0.0,"statut":{"idStatut":6,"code":"REJETEE","libelle":"REJETEE","demandes":[]},"dateDemandeCession":"2022-11-21T15:34:17.575038","dateMarche":null},{"idCreance":9,"ninea":"123456789088","rccm":"SN DK 2898 Y 9989","raisonSocial":null,"typeMarche":null,"nomMarche":"Marche 1","montantCreance":2000000.0,"decote":null,"soldePME":0.0,"statut":{"idStatut":25,"code":"CONVENTION_ACCEPTEE","libelle":"CONVENTION_ACCEPTEE","demandes":[]},"dateDemandeCession":"2022-11-21T15:34:51.721463","dateMarche":null},{"idCreance":24,"ninea":"123456789088","rccm":"SN DK 2898 Y 9989","raisonSocial":null,"typeMarche":null,"nomMarche":"Marche 1","montantCreance":2000000.0,"decote":null,"soldePME":0.0,"statut":{"idStatut":25,"code":"CONVENTION_ACCEPTEE","libelle":"CONVENTION_ACCEPTEE","demandes":[]},"dateDemandeCession":"2022-11-22T09:36:17.86308","dateMarche":null}],"pageable":{"sort":{"empty":true,"sorted":false,"unsorted":true},"offset":0,"pageNumber":0,"pageSize":20,"paged":true,"unpaged":false},"totalPages":1,"totalElements":3,"last":true,"size":20,"number":0,"sort":{"empty":true,"sorted":false,"unsorted":true},"numberOfElements":3,"first":true,"empty":false}
