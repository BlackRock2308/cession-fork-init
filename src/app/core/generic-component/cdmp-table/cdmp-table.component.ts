import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {CdmpTableConfig} from './cdmp-table-config.model';
import {CdmpTableCols} from './cdmp-table-cols.model';
import {RowSizes} from './row-sizes.model';

import {Subscription, timer} from 'rxjs';
import {CdmpTableService} from './cdmp-table.service';
import {CdmpTableAction} from './cdmp-table-action.model';


@Component({
    selector: "cdmp-table",
    templateUrl: './cdmp-table.component.html',
    styleUrls: ['./cdmp-table.component.scss']
})
export class CdmpTableComponent implements OnInit {
    // Outputs (Event handlerd)
    @Output() reloadTable = new EventEmitter();
    @Output() selectRow = new EventEmitter();
    @Output() unselectRow = new EventEmitter();
    @Output() selectedRow = new EventEmitter();
    @Output() actions = new EventEmitter();
    @Output() states = new EventEmitter();
    @Output() addCallBack = new EventEmitter();

    // Template ref
    @ContentChild('headerTemplate', {static: false})
    headerTemplateRef?: TemplateRef<any>;
    @ContentChild('states')
    statesRef?: TemplateRef<any>;
    @ContentChild('actions')
    actionsRef?: TemplateRef<any>;
    @ContentChild('body')
    bodyRef?: TemplateRef<any>;
    @ContentChild('rowexpansion')
    rowexpansionRef?: TemplateRef<any>;

    // Inputs
    _tableConfig = new CdmpTableConfig();
    @Input()
    set tableConfig(tableConf: CdmpTableConfig) {
        this._tableConfig = tableConf;
        if (tableConf.initialShowDatas === true) {
            this.datas = this.allDatas;
        }
    }

    get tableConfig() {
        return this._tableConfig;
    }

    @Input() datas: any[] = [];
    @Input() allDatas: any[] = [];
    @Input() cols?: CdmpTableCols[];

    // Simple variables
    rowSizes: any = RowSizes;
    selected: any[] = [];
    exportColumns?: any[];
    expandedRows = {};
    isExpanded = false;

    // Loading display delay
    countDown: Subscription | undefined;
    counter = 3;
    tick = 1000;

    constructor(private table: CdmpTableService) {
    }

    ngOnInit(): void {
        this.exportColumns = this.cols?.map(col => ({title: col.header, dataKey: col.field}));
    }

    pdf() {
        this.table.toPdf(this.exportColumns, this.datas);
    }

    excel() {
        this.table.toExcel(this.datas);
    }

    showValues(data: any) {
        console.log('Valeur', data);
    }

    onSelect(event: any) {
        this.selectRow.emit(event);
    }

    getSelectedRow() {
        this.selectedRow.emit(this.selected);
    }

    onUnselect(event: any) {
        this.unselectRow.emit(event);
    }

    reload() {
        this.reloadTable.emit();
        this.tableConfig.loading = true;

        // Loading display countdown
        this.countDown = timer(0, this.tick).subscribe(
            () => {
                this.counter > 0 ? --this.counter : null;
                console.log(this.counter);
                if (this.counter === 0) {
                    this.tableConfig.loading = false;
                    this.countDown?.unsubscribe();
                }
            }
        );
        // stop ticker

        // Reinitialize counter for later use again
        this.counter = 3;
    }


    actionCallback(action: CdmpTableAction, item: any) {
        this.actions.emit([action.callback, item]);
    }

    stateCallback(state: CdmpTableAction, item: any) {
        this.states.emit([state.callback, item]);
    }

    add() {
        this.addCallBack.emit(true);
    }

    onRowExpand() {
        if (Object.keys(this.expandedRows).length === this.datas?.length) {
            this.isExpanded = true;
        }
    }

    onRowCollapse() {
        if (Object.keys(this.expandedRows).length === 0) {
            this.isExpanded = false;
        }
    }

    searchEventMethode(keyWord: any) {
        console.log(this.tableConfig.initialShowDatas);
        if (keyWord) {
            this.datas = this.allDatas;
        } else {
            this.datas = [];
        }
    }

    closeAll() {
        this.expandedRows = {};
        this.isExpanded = false;
    }

}
