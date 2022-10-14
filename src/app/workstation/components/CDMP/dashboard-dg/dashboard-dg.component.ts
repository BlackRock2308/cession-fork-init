import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterMatchMode, FilterService, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DemandeAdhesion } from 'src/app/workstation/model/demande';
import { DemandesAdhesionService } from 'src/app/workstation/service/demandes_adhesion/demandes-adhesion.service';
import { DemandesAdhesionComponent } from '../demandes-adhesion/demandes-adhesion.component';
import { DetailsTableauComponent } from './details-tableau/details-tableau.component';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/workstation/model/appconfig';
import { AppConfigService } from 'src/app/workstation/service/appconfigservice';

import * as FileSaver from 'file-saver';

import 'jspdf-autotable';
import { BreadcrumbService } from 'src/app/core/breadcrumb/breadcrumb.service';
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

    rangeDates:any[];
    matchModeOptions: SelectItem[];
    statuts:any[];

    constructor(private configService: AppConfigService, private demandesAdhesionService: DemandesAdhesionService, 
        public dialogService: DialogService, 
        private messageService: MessageService, private router: Router,private breadcrumbService: BreadcrumbService,    
        private filterService:FilterService
        ) { 
            this.breadcrumbService.setItems([
                { label: 'Tableau de bord' },
            ]);
            this.breadcrumbService.setHome({ icon: 'pi pi-home', routerLink:  ['cdmp/dashboard'] })


    
        }
        exportColumns: any[];


    ngOnInit() {

        this.profil = localStorage.getItem('profil');

        this.demandesAdhesionService.getDemandesAdhesion().subscribe(data => {
            this.demandes = data
            console.log(this.demandes)
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

        //filtre par range date
        this.calenderFilter()


        this.matchModeOptions = [
            { label: 'Intervalle de date', value: 'rangeDate' },
            { label: 'Commence par', value: FilterMatchMode.STARTS_WITH },
            { label: 'Contient', value: FilterMatchMode.CONTAINS },
        ];
        this.statuts = [
            {label: 'Acceptée', value: 'Acceptée'},
            {label: 'Refusée', value: 'Refusée'}
        ]
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
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.demandes);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "liste_creance");
        });

    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
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


      //filtre par intervalle de date
  public calenderFilter() {
    
    this.filterService.register('rangeDate' ,(value: any, filter: any): boolean => {
     //Afficher toute les lignes du tableau au démarrage
     if(this.rangeDates== undefined){
       return true;
     }
     //redéfinir les dates pour comparer sans prendre en compte l'heure
     //on donne toutes les date l'heure 00:00:00
     const d=value.split("/")
     value=new Date((new Date(d[2],d[1]-1,d[0])).toDateString())
     this.rangeDates[0]=new Date((new Date(this.rangeDates[0])).toDateString())
     if( this.rangeDates[1] !== null ){
       this.rangeDates[1]=new Date((new Date(this.rangeDates[1])).toDateString())
     }

     if (this.filterService.filters.is(value,this.rangeDates[0]) && this.rangeDates[1] === null) {
        console.log(value)
        console.log(1)
        return true;
    }
   
    if (this.filterService.filters.is(value,this.rangeDates[1])  && this.rangeDates[0] === null) {
      console.log(2)
        return true;
    }
   
    if (this.rangeDates[0] !== null && this.rangeDates[1] !== null &&
      this.filterService.filters.after(value,this.rangeDates[0]) && this.filterService.filters.before(value,this.rangeDates[1])) {
        console.log(3)
        return true;
    }
   
    console.log(5,this.filterService.filters.after(value,this.rangeDates[0]),this.filterService.filters.before(value,this.rangeDates[1]),value,this.rangeDates[0])
    return false;
   })
   }

 //effacer le filtre par date
 clearRange(table){
   this.rangeDates=undefined;
   table.filter()
 }
}