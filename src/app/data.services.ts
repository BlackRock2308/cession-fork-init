import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
    providedIn: 'root'
  })
  export class DataService implements InMemoryDbService{
  
    constructor() { }
    createDb(){
  
     let  pmes =  [
      {  id:  1,  Ninea:  '876545678765', rccm: '8765435678876', Raisonsocial: 'ModelSIS', nomRep: 'Ndiaye', telephone: '785676565' },
      {  id:  2,  Ninea:  '876545678746', rccm: '8765435568233', Raisonsocial: 'Agri', nomRep: 'Diallo', telephone: '785671260' },
      {  id:  3,  Ninea:  '876545678432', rccm: '8765435678809', Raisonsocial: 'Test', nomRep: 'Touré', telephone: '785673464' },
      {  id:  4,  Ninea:  '876545678673', rccm: '8765435678845', Raisonsocial: 'Fintech', nomRep: 'Sy', telephone: '785677667' },
     ];
  
     return {pmes};
  
    }
  }