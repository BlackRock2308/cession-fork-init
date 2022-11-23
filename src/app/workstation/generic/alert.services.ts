import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(private messageService: MessageService) {
    this.messageService.messageObserver.subscribe();
  }

  showSuccess(message:string) {
    this.messageService.add({severity:'success', summary: 'Succès', detail: message});
}

showInfo(message:string) {
    this.messageService.add({severity:'info', summary: 'Info', detail: message});
}

showWarn(message:string) {
    this.messageService.add({severity:'warn', summary: 'Avertissement', detail: message});
}

showError(message:string) {
    this.messageService.add({severity:'error', summary: 'Erreur', detail: message});
}

showTopLeft(message:string) {
    this.messageService.add({key: 'tl', severity:'info', summary: 'Info', detail: message});
}

showTopCenter(message:string) {
    this.messageService.add({key: 'tc', severity:'info', summary: 'Info', detail: message});
}

showBottomCenter(message:string) {
    this.messageService.add({key: 'bc', severity:'info', summary: 'Info', detail: message});
}

showConfirm(message:string) {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
}

 

  // Closes the last toast item
  closeAlert (): void {
    this.messageService.clear();
  }

}
