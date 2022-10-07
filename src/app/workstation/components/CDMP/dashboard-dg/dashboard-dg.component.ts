import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService, SelectItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DemandeAdhesion } from 'src/app/workstation/model/demande';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { DemandesAdhesionComponent } from '../demandes-adhesion/demandes-adhesion.component';
import { DetailsTableauComponent } from './details-tableau/details-tableau.component';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/workstation/model/appconfig';
import { AppConfigService } from 'src/app/workstation/service/appconfigservice';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import 'jspdf-autotable';
@Component({
    selector: 'app-dashboard-dg',
    templateUrl: './dashboard-dg.component.html',
    styleUrls: ['./dashboard-dg.component.scss'],
    providers: [DialogService]

})
export class DashboardDGComponent implements OnInit {

    demandeDialog: boolean;

    fileName = 'MarchesCDMP.xlsx';
    demandes: DemandeAdhesion[];

    demande: DemandeAdhesion;

    submitted: boolean;

    cols: any[];

    cities: any[];


    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    items: MenuItem[];
    home: MenuItem;

    activeIndex: number = 1;
    basicData: any;

    basicOptions: any;

    multiAxisData: any;

    chartOptions: any;

    multiAxisOptions: any;

    stackedData: any;
    selectedCity1: any;

    stackedData1: any;

    stackedOptions: any;

    horizontalOptions: any;

    subscription: Subscription;

    config: AppConfig;

    profil: string;

    dropdownYears: SelectItem[];

    selectedYear: any;

    constructor(private configService: AppConfigService, private demandesAdhesionService: DemandesAdhesionService, public dialogService: DialogService, private messageService: MessageService, private router: Router,
        ) { 


    
        }
        exportColumns: any[];


    ngOnInit() {

        this.profil = localStorage.getItem('profil');

        this.demandesAdhesionService.getDemandesAdhesion().subscribe(data => {
            this.demandes = data
        });

        this.cols = [
            { field: 'nomMarche', header: 'Nom du marché' },
            { field: 'raisonSocial', header: 'Raison Sociale' },
            { field: 'date_soumission', header: 'Date de demande' },
            { field: 'montant_total', header: 'Montant Total' },
            { field: 'date_marche', header: 'Date du marché' },
            { field: 'statut_dg', header: 'Statut' },
            { field: 'decode', header: 'Decote' },
            { field: 'date_cession', header: 'Date cession' },
            { field: 'solde_PME', header: 'Solde de la PME' }
        ];
        this.items = [
            { label: 'Tableau de bord ' }
        ];

        this.dropdownYears = [
            {label: '2021', value: 2021},
            {label: '2020', value: 2020},
            {label: '2019', value: 2019},
            {label: '2018', value: 2018},
            {label: '2017', value: 2017},
            {label: '2016', value: 2016},
            {label: '2015', value: 2015},
            {label: '2014', value: 2014}
        ];

        this.home = { icon: 'pi pi-home', url: '/#/workstation/cdmp/dashboard' };

        this.basicData = {
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            datasets:
                [
                    {
                        label: 'PME bénéficiare',
                        data: [65, 59, 80, 81, 56, 55, 40, 34, 12, 67, 90, 100],
                        fill: false,
                        borderColor: '#99CC33',
                        tension: .4
                    },
                    {
                        label: 'PME rejeté',
                        data: [5, 9, 8, 12, 6, 2, 4, 20, 3, 7, 0, 10],
                        fill: false,
                        borderColor: '#981639',
                        tension: .4
                    }
                ]


        };

        this.multiAxisOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                        color: '#ebedef'
                    },
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057'
                    }
                }
            }
        };

        this.stackedData1 = {
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            datasets: [{
                type: 'bar',
                label: 'Remboursé',
                backgroundColor: ' #99CC33',
                data: [
                    10,
                    9,
                    7,
                    9,
                    8,
                    11,
                    12,
                    7,
                    9,
                    8,
                    11,
                    12
                ]
            }, {
                type: 'bar',
                label: 'Solde',
                backgroundColor: ' #981639',
                data: [
                    1,
                    3,
                    2,
                    3,
                    2,
                    1,
                    3,
                    2,
                    3,
                    2,
                    1,
                    3
                ]
            }, {
                type: 'bar',
                label: 'Décote',
                backgroundColor: ' #333366',
                data: [
                    1,
                    2,
                    2,
                    1,
                    2,
                    1,
                    1,5,
                    1,5,
                    1,
                    2,
                    1,
                    2
                ]
            }
            ]
        };

        this.stackedData = {
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            datasets: [{
                label: 'Déboursé',
                backgroundColor: ' #99CC33',
                data: [
                    10,
                    9,
                    7,
                    9,
                    8,
                    11,
                    12,
                    7,
                    9,
                    8,
                    11,
                    12
                ]
            }, {
                label: 'Engagé',
                backgroundColor: ' #333366',
                data: [
                    11,
                    10,
                    9,
                    11,
                    10,
                    12,
                    15,
                    9,
                    11,
                    10,
                    12,
                    15
                ]
            }, {
                label: 'Solde',
                backgroundColor: ' #981639',
                data: [
                    1,
                    3,
                    2,
                    3,
                    2,
                    1,
                    3,
                    2,
                    3,
                    2,
                    1,
                    3
                ]
            }
            ]
        };

        this.stackedOptions = {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        };

        this.config = this.configService.config;
        this.updateChartOptions();
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });

        this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

    }

    exportPdf() {
       
        import("jspdf").then(jsPDF => {
            import("jspdf-autotable").then(x => {
                const doc = new jsPDF.default('landscape','pt');
                //const pdf = new jsPDF('landscape', 'px', 'a4');
                doc["autoTable"](this.exportColumns, this.demandes);
                doc.save('Liste_des_creances.pdf');
            })
        }) 
           
    }
    

    exportexcel(): void {
        /* pass here the table id */
        let element = document.getElementById('excel-table');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */

        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, this.fileName);

    }
    visualiserDetails(demande: DemandeAdhesion) {
        this.demande = {...demande};
        //console.log(demande)
        this.demandesAdhesionService.setDemandenantissementObs(demande);
        const ref = this.dialogService.open(DetailsTableauComponent, {
            data: {
                demande: demande
            },
            header: "Détails du marché",
            width: '40%',
            height: 'calc(86% - 100px)',
            baseZIndex: 10000
        });

    }


    updateChartOptions() {
        this.chartOptions = this.config && this.config.dark ? this.applyDarkTheme() : this.applyLightTheme();
    }

    applyDarkTheme() {
        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                }
            }
        };

        this.horizontalOptions = {
            indexAxis: 'y',
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                }
            }
        };

        this.multiAxisOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(255,255,255,0.2)'
                    },
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#ebedef'
                    }
                }
            }
        };

        this.stackedOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: ''
                    }
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: ' #981639'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: ' #333366'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                }
            }
        };
    }

    applyLightTheme() {
        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        this.horizontalOptions = {
            indexAxis: 'y',
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        this.multiAxisOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                        color: '#ebedef'
                    },
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057'
                    }
                }
            }
        };

        this.stackedOptions = {
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: ''
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: ' #981639'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: ' #333366'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
    }
}