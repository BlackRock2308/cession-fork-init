import {Component, OnInit} from '@angular/core';
import {CdmpDialogConfig} from '../cdmp-dialog/cdmp-dialog-config.model';
import {CdmpTableCols} from '../cdmp-table/cdmp-table-cols.model';
import {CdmpTableConfig} from '../cdmp-table/cdmp-table-config.model';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

    tableConfig: CdmpTableConfig = {
        title: 'Table example',
        titleTooltip: 'My tooltips',
        loading: false,
        addBtn: true,
        selectByCheckBox: false,
        selectByRadio: false,
        rowSelect: false,
        key: 'movies',
        displayAction: true,
        paginationRow: 10,
        enablePagination: true,
        enableSearchBar: true,
        enableExport: true,
        enableReload: true,
        extraFilter: false,
        searchBarField: ['title', 'type', 'writer', 'country', 'year'],
        actions: [
            {
                type: 'start',
                callback: 'startFn',
            },
            {
                type: 'download',
                mini: true,
                callback: 'downloadFn',
            },
            {
                type: 'view',
                mini: true,
                callback: 'viewFn',
            },
            {
                type: 'edit',
                mini: true,
                callback: 'editFn',
            },
            {
                type: 'delete',
                mini: true,
                callback: 'deleteFn',
            },
        ]
    };

    items: any[] = [];
    cols: CdmpTableCols[] = [];


    dialogConfig?: CdmpDialogConfig;
    constructor() {
    }

    ngOnInit(): void {
        this.getItems();

        this.cols = [
            {field: 'title', header: 'Title', sortable: true, filterable: true, type: 'text'},
            {field: 'country', header: 'Country', sortable: true, filterable: true, type: 'text'},
            {field: 'type', header: 'Type', sortable: true, filterable: true, type: 'text'},
            {field: 'language', header: 'Language', sortable: true, filterable: true, type: 'text'},
            {field: 'year', header: 'Year', sortable: true, filterable: true, type: 'text'}
        ];
    }




    getItems() {
        this.items = [
            {
                title: 'Avengers',
                // writer: 'English',
                country: 'France, Canada, United States',
                type: 'Series',
                language: 'English',
                year: '2021'
            },
            {
                title: 'Hulk',
                // writer: 'English',
                country: 'United States',
                type: 'Films',
                language: 'English',
                year: '2020'
            },
            {
                title: 'Hulk',
                // writer: 'English',
                country: 'United States',
                type: 'Films',
                language: 'English',
                year: '2020'
            },
            {
                title: 'Hulk',
                // writer: 'English',
                country: 'United States',
                type: 'Films',
                language: 'English',
                year: '2020'
            },
            {
                title: 'Hulk',
                // writer: 'English',
                country: 'United States',
                type: 'Films',
                language: 'English',
                year: '2020'
            },
            {
                title: 'Hulk',
                // writer: 'English',
                country: 'United States',
                type: 'Films',
                language: 'English',
                year: '2020'
            },
            {
                title: 'Hulk',
                // writer: 'English',
                country: 'United States',
                type: 'Films',
                language: 'English',
                year: '2020'
            },
            {
                title: 'Hulk',
                // writer: 'English',
                country: 'United States',
                type: 'Films',
                language: 'English',
                year: '2020'
            },
            {
                title: 'Hulk',
                // writer: 'English',
                country: 'United States',
                type: 'Films',
                language: 'English',
                year: '2020'
            },
            {
                title: 'Hulk',
                // writer: 'English',
                country: 'United States',
                type: 'Films',
                language: 'English',
                year: '2020'
            },
            {
                title: 'Hulk',
                // writer: 'English',
                country: 'United States',
                type: 'Films',
                language: 'English',
                year: '2020'
            },
            {
                title: 'Hulk',
                // writer: 'English',
                country: 'United States',
                type: 'Films',
                language: 'English',
                year: '2020'
            },
            {
                title: 'Hulk',
                // writer: 'English',
                country: 'United States',
                type: 'Films',
                language: 'English',
                year: '2020'
            },
            {
                title: 'Hulk',
                // writer: 'English',
                country: 'United States',
                type: 'Films',
                language: 'English',
                year: '2020'
            },
            {
                title: 'Hulk',
                // writer: 'English',
                country: 'United States',
                type: 'Films',
                language: 'English',
                year: '2020'
            },
        ];
    }


    onRowSelect = (event: any) => event.data;
    onRowUnselect = (event: any) => event.data;
    selectedRow = (event: any) => event;

    reload = () => this.getItems;

    call(event: any[]) {
        const fn = event[0];
        // this[fn]($event[1]);
    }

    startFn = (item: any) => item;
    editFn = (item: any) => item;
    deleteFn = (item: any) => item;

    // Dialog
    openDialog = () => {
        this.dialogConfig = {
            showAction: true,
            display: true,
            title: 'Modal example',
            canSave: false,
            tabs: [
                {name: 'Item 1', required: true},
                {name: 'Item 2', required: true, warning: true, disabled: false},
                {name: 'Item 3', required: false, warning: true, disabled: false},
                {name: 'Item 4', required: false, disabled: true},
            ]
        };
    }

    next(activeTab: number) {
        // this.dialogConfig!.tabs![activeTab].warning! = false; // unlock tab
        this.dialogConfig.tabs[activeTab].warning = false; // unlock tab
        // this.dialogConfig!.canSave = true; // enable save
        this.dialogConfig.canSave = true; // enable save
    }

    previous = (activeTab: number) => activeTab;

    save = () => {
        // this.dialogConfig!.display = false;
        this.dialogConfig.display = false;
    }

    cancel = () => 'cancel';


}
