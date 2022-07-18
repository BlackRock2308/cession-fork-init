import {Component, ContentChild, Input, EventEmitter, Output, TemplateRef} from '@angular/core';
import {CdmpDialogConfig} from './cdmp-dialog-config.model';

@Component({
    selector: 'cdmp-dialog',
    templateUrl: './cdmp-dialog.component.html',
    styleUrls: ['./cdmp-dialog.component.scss']
})
export class CdmpDialogComponent {

    @Output() next = new EventEmitter();
    @Output() previous = new EventEmitter();
    @Output() save = new EventEmitter();
    @Output() cancel = new EventEmitter();
    @Output() close = new EventEmitter();
    @Input() config = new CdmpDialogConfig();
    disable?: boolean;
    @ContentChild('content')
    contentRef?: TemplateRef<any>;

    @ContentChild('tab')
    tabRef?: TemplateRef<any>;

    activeTab = 0;

    constructor() {
    }

    goSave = () => this.config.canSave ? this.save.emit() : false;

    goPrevious = (i: boolean) => {
        if (!i) {
            this.activeTab = this.activeTab - 1;
        }
        this.previous.emit(this.activeTab);
    }

    goNext = (i: boolean) => {
        if (this.config?.tabs?.length !== (this.activeTab + 1)) {
            if (!i) {
                this.activeTab = this.activeTab + 1;
            }
            this.next.emit(this.activeTab);
        }
    }

    goCancel = () => {
        this.config.display = false;
        this.cancel.emit();
    }
    goClose = () => {
        this.config.display = false;
        this.close.emit();
    }

    changeTab = (index: number) => this.activeTab = index;

}
