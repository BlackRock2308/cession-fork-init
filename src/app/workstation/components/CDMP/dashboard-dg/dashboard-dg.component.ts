import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FilterMatchMode,
  FilterService,
  MenuItem,
  MessageService,
  SelectItem,
} from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { DemandeAdhesion } from "src/app/workstation/model/demande";
import { DemandesAdhesionService } from "src/app/workstation/service/demandes_adhesion/demandes-adhesion.service";
import { DemandesAdhesionComponent } from "../demandes-adhesion/demandes-adhesion.component";
import { DetailsTableauComponent } from "./details-tableau/details-tableau.component";
import { Subscription } from "rxjs";
import { AppConfig } from "src/app/workstation/model/appconfig";
import { AppConfigService } from "src/app/workstation/service/appconfigservice";

import * as FileSaver from "file-saver";

import "jspdf-autotable";
import { BreadcrumbService } from "src/app/core/breadcrumb/breadcrumb.service";
import { Creance } from "src/app/workstation/model/creance";
import { DashboardServices } from "src/app/workstation/service/dashboard.services";
import {
  StatistiqueDemandeCession,
  StatistiquePaiementCDMP,
  StatistiquePaiementPME,
} from "src/app/workstation/model/dashboard";
import { WebsocketService } from "src/app/workstation/service/websocket/websocket.service";
import { MyWebSocketServiceService } from "src/app/workstation/service/my-web-socket-service.service";
import { PushNotificationsService } from 'ng-push-ivy';
import { AppNotification } from "src/app/workstation/service/websocket/model/app-notification";
import { Socket } from "ngx-socket-io";
import { WebSocketSubject } from "rxjs/webSocket";



@Component({
  selector: "app-dashboard-dg",
  templateUrl: "./dashboard-dg.component.html",
  styleUrls: ["./dashboard-dg.component.scss"],
  providers: [DialogService, PushNotificationsService],
})
export class DashboardDGComponent implements OnInit {

  counter: number;

  demandeDialog: boolean;

  fileName = "MarchesCDMP.xlsx";
  creances: Creance[];

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
  stackedDataPME: any;
  stackedData1: any;

  stackedOptions: any;

  horizontalOptions: any;

  subscription: Subscription;
  mois: any;
  config: AppConfig;
  idPME: number;
  profil: string;
  user: any;
  statistiquePmes: StatistiqueDemandeCession[];
  statistiquePmesRembourses: StatistiquePaiementCDMP;
  statistiquePmesDebourses: StatistiquePaiementPME;
  selectedYearPME: Date;
  selectedYear: Date;
  selectedYearDeburse: Date;
  selectedYearRembourse: Date;
  rangeDates: any[];
  matchModeOptions: SelectItem[];
  statuts: any[];
  optionsBenRej: any;

  socket$: WebSocketSubject<string>;

  constructor(
    private configService: AppConfigService,
    private demandesAdhesionService: DemandesAdhesionService,
    public dialogService: DialogService,
    private dashboardServices: DashboardServices,
    private breadcrumbService: BreadcrumbService,
    private filterService: FilterService,

    private websocketService : WebsocketService,
    private notificationService : MyWebSocketServiceService,
    private pushNotifications: PushNotificationsService,



  ) {
    this.pushNotifications.requestPermission();
    this.counter = 0;

    this.breadcrumbService.setItems([{ label: "Tableau de bord" }]);
    this.breadcrumbService.setHome({
      icon: "pi pi-home",
      routerLink: ["cdmp/dashboard"],
    });

    //this.socket$ = this.notificationService.getSocket();

  }
  exportColumns: any[];

  messageList: string[] = [];




  connect(): void {


    //this.socket$ = this.notificationService.getSocket();

    console.log("******* Connecting to Notification App *********");
    
    this.notificationService.connect();

    // subscribe receives the value.
    this.websocketService.notificationMessage.subscribe((data) => {
      console.log('receive message from notification service', data);
      this.notify(data);           
    });
  }



  disconnect(): void {
    this.notificationService.disconnect();
  }


  notify(message: AppNotification): void {
    this.counter++;
    const options = {
      body: message.content,
      //icon: icon.get(message.type.toLowerCase())
    };
    this.pushNotifications.create('New Alert', options).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }


  async ngOnInit() {

    // this.socket$.next("Good morning from heaven");

    //  this.socket$.subscribe(

    // (message)=> {
    //   console.log("message received : " +message);
    // },
    // (err)=>{
    //   console.log("error : " + err);
    // },
    // () => {
    //   console.log("complete");
    // }
    //  );

    this.connect();

    this.mois = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    let today = new Date();
    today.setFullYear(today.getFullYear() - 1);
    this.profil = localStorage.getItem("profil");
    this.user = JSON.parse(sessionStorage.getItem("auth-user"));
    this.demandesAdhesionService.getCreances().subscribe((data) => {
      this.creances = data.content;
    });
    if (this.profil != "PME") {
      this.selectedYear = today;
      this.selectedYearDeburse = today;
      this.selectedYearRembourse = today;
      this.getStatistiqueRembouseDuTresor(
        this.selectedYearRembourse.getFullYear()
      );
      this.getStatistiqueDebourseCDMP(this.selectedYearDeburse.getFullYear());
      this.getStatistiquePMEBeneficiereAndRejete(
        this.selectedYear.getFullYear()
      );
    } else {
      this.selectedYearPME = today;
      this.dashboardServices
        .getPMEByUser(this.user.idUtilisateur)
        .subscribe((res: any) => {
          if (res) {
            this.idPME = res.idPME;
            this.getStatistiqueDebourseCDMPByPME(
              this.selectedYearPME.getFullYear(),
              this.idPME
            );
          }
        });
    } 

    this.cols = [
      { field: "nomMarche", header: "Nom du marché" },
      { field: "raisonSocial", header: "Raison Sociale" },
      { field: "dateDemandeCession", header: "Date de demande" },
      { field: "montantCreance", header: "Montant Total" },
      { field: "dateMarche", header: "Date du marché" },
      { field: "statut", header: "Statut" },
      { field: "decote", header: "Decote" },
      { field: "soldePME", header: "Solde de la PME" },
    ];

    //filtre par range date
    this.calenderFilter();

    this.matchModeOptions = [
      { label: "Intervalle de date", value: "rangeDate" },
      { label: "Commence par", value: FilterMatchMode.STARTS_WITH },
      { label: "Contient", value: FilterMatchMode.CONTAINS },
    ];
    this.statuts = [
      { label: "Acceptée", value: "Acceptée" },
      { label: "Refusée", value: "Refusée" },
    ];

    this.config = this.configService.config;
    this.updateChartOptions();
    this.subscription = this.configService.configUpdate$.subscribe((config) => {
      this.config = config;
      this.updateChartOptions();
    });

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  onSelectYearRembourse(event) {
    this.getStatistiqueRembouseDuTresor(
      this.selectedYearRembourse.getFullYear()
    );
  }

  onSelectYearDebourse(event) {
    this.getStatistiqueDebourseCDMP(this.selectedYearDeburse.getFullYear());
  }

  onSelectYear(event) {
    this.getStatistiquePMEBeneficiereAndRejete(this.selectedYear.getFullYear());
  }

  onSelectYearPME(event) {
    this.getStatistiqueDebourseCDMPByPME(
      this.selectedYearPME.getFullYear(),
      this.idPME
    );
  }

  getStatistiquePMEBeneficiereAndRejete(annee: number) {
    this.dashboardServices
      .getStatistiqueDemandeCession(annee)
      .subscribe((res: StatistiqueDemandeCession[]) => {
        let nombreDemandeRejete: number[] = [];
        let nombreDemandeAccepte: number[] = [];
        let mois: any[] = [];
        if (res.length) {
          this.statistiquePmes = res;
          for (let el of this.statistiquePmes) {
            nombreDemandeAccepte.push(el.nombreDemandeAccepte);
            nombreDemandeRejete.push(el.nombreDemandeRejete);
            mois.push(el.mois);
          }
          let maxNbr: number;
          let stepSiz: number = 1;
          if (
            Math.max(...nombreDemandeAccepte) > Math.max(...nombreDemandeRejete)
          ) {
            maxNbr = Math.max(...nombreDemandeAccepte);
          } else {
            maxNbr = Math.max(...nombreDemandeRejete);
          }
          if (maxNbr < 5) {
            maxNbr = 5;
          }
          this.basicData = {
            labels: this.mois,
            datasets: [
              {
                label: "PME bénéficiare",
                data: nombreDemandeAccepte,
                fill: false,
                borderDash: [5, 5],
                borderColor: "#99CC33",
                tension: 0.4,
              },
              {
                label: "PME rejeté",
                data: nombreDemandeRejete,
                fill: false,
                borderColor: "#981639",
                tension: 0.4,
              },
            ],
          };
          if (maxNbr >= 20) {
            stepSiz = 10;
          }
          this.optionsBenRej = {
            scales: {
              y: {
                max: maxNbr,
                min: 0,
                ticks: {
                  stepSize: stepSiz,
                },
              },
            },
          };
        }
      });
  }

  getStatistiqueDebourseCDMP(annee: number) {
    this.dashboardServices
      .getStatistiqueAllPaiementPME(annee)
      .subscribe((res: StatistiquePaiementPME) => {
        if (res) {
          this.statistiquePmesDebourses = res;
          let cumulDebourses: number[] = [];
          let cumulSoldes: number[] = [];
          let cumulMontantCreance: number[] = [];
          let cumulDecotes: number[] = [];
          for (var i = 0; i < 12; i++) {
             cumulDebourses.push(
              this.statistiquePmesDebourses.cumulDebourses[i]?.montant / 1000000
            );
            cumulDecotes.push(
              this.statistiquePmesDebourses.cumulDecotes[i]?.montant / 1000000
            );
            cumulSoldes.push(
              this.statistiquePmesDebourses.cumulSoldes[i]?.montant / 1000000
            );
            cumulMontantCreance.push(
              this.statistiquePmesDebourses.cumulMontantCreance[i]?.montant /
                1000000
            );
          }
          this.stackedData = {
            labels: this.mois,
            datasets: [
              {
                label: "Engagé",
                backgroundColor: " #333366",
                data: cumulMontantCreance,
              },
              {
                label: "Solde",
                backgroundColor: " #981639",
                data: cumulSoldes,
              },
              {
                label: "Déboursé",
                backgroundColor: " #99CC33",
                data: cumulDebourses,
              },
              {
                label: "Décote",
                backgroundColor: " #696969",
                data: cumulDecotes,
              }
            ],
          };
        }
      });
  }

  getStatistiqueRembouseDuTresor(annee: number) {
    this.dashboardServices
      .getStatistiquePaiementCDMP(annee)
      .subscribe((res: StatistiquePaiementCDMP) => {
        this.statistiquePmesRembourses = res;
        let cumulDecotes: number[] = [];
        let cumulSoldes: number[] = [];
        let cumulMontantCreance: number[] = [];
        let cumulRembourse: number[] = [];
        if (res) {
          for (var i = 0; i < 12; i++) {
            cumulDecotes.push(
              this.statistiquePmesRembourses.cumulDecotes[i]?.montant / 1000000
            );
            cumulSoldes.push(
              this.statistiquePmesRembourses.cumulSoldes[i]?.montant / 1000000
            );
            cumulRembourse.push(
              this.statistiquePmesRembourses.cmulRembourses[i]?.montant /
                1000000
            );
            cumulMontantCreance.push(
              this.statistiquePmesRembourses.cumulMontantCreance[i]?.montant /
                1000000
            );
          }
          this.stackedData1 = {
            labels: this.mois,
            datasets: [
              {
                label: "Engagé",
                backgroundColor: " #333366",
                data: cumulMontantCreance,
              },
              {
                label: "Solde",
                backgroundColor: " #981639",
                data: cumulSoldes,
              },
              {
                label: "Remboursé",
                backgroundColor: " #99CC33",
                data: cumulRembourse,
              },
              {
                type: "bar",
                label: "Décote",
                backgroundColor: " #696969",
                data: cumulDecotes,
              },
            ],
          };
        }
      });
  }

  getStatistiqueDebourseCDMPByPME(annee: number, idPM: number) {
    this.dashboardServices
      .getStatistiquePaiementByPME(annee, idPM)
      .subscribe((res: StatistiquePaiementPME) => {
        if (res) {
          this.statistiquePmesDebourses = res;
          let cumulDebourses: number[] = [];
          let cumulSoldes: number[] = [];
          let cumulMontantCreance: number[] = [];
          let cumulDecotes: number[] = [];
          for (var i = 0; i < 12; i++) {
            cumulDecotes.push(
              this.statistiquePmesDebourses.cumulDecotes[i]?.montant / 1000000
            );
            cumulSoldes.push(
              this.statistiquePmesDebourses.cumulSoldes[i]?.montant / 1000000
            );
            cumulDebourses.push(
              this.statistiquePmesDebourses.cumulDebourses[i]?.montant / 1000000
            );
            cumulMontantCreance.push(
              this.statistiquePmesDebourses.cumulMontantCreance[i]?.montant /
                1000000
            );
          }
          this.stackedDataPME = {
            labels: this.mois,
            datasets: [
              {
                label: "Montant de créance",
                backgroundColor: " #333366",
                data: cumulMontantCreance,
              },
              {
                label: "Restant",
                backgroundColor: " #981639",
                data: cumulSoldes,
              },
              {
                label: "Montant reçu",
                backgroundColor: " #99CC33",
                data: cumulDebourses,
              },
              {
                type: "bar",
                label: "Décote",
                backgroundColor: " #696969",
                data: cumulDecotes,
              }
            ],
          };
        }
      });
  }

  exportPdf() {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then((x) => {
        const doc = new jsPDF.default("landscape", "pt");
        //const pdf = new jsPDF('landscape', 'px', 'a4');
        doc["autoTable"](this.exportColumns, this.creances);
        doc.save("Liste_des_creances.pdf");
      });
    });
  }

  exportexcel(): void {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.creances);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "liste_creance");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }
  visualiserDetails(demande: Creance) {
    //  this.demandesAdhesionService.setDemandenantissementObs(demande);
    const ref = this.dialogService.open(DetailsTableauComponent, {
      data: {
        demande: demande,
      },
      header: "Détails du marché",
      width: "40%",
      height: "calc(86% - 100px)",
      baseZIndex: 100000000,
    });
  }

  updateChartOptions() {
    this.chartOptions =
      this.config && this.config.dark
        ? this.applyDarkTheme()
        : this.applyLightTheme();
  }

  applyDarkTheme() {
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: "#ebedef",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#ebedef",
          },
          grid: {
            color: "rgba(255,255,255,0.2)",
          },
        },
        y: {
          ticks: {
            color: "#ebedef",
          },
          grid: {
            color: "rgba(255,255,255,0.2)",
          },
        },
      },
    };

    this.horizontalOptions = {
      indexAxis: "y",
      plugins: {
        legend: {
          labels: {
            color: "#ebedef",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#ebedef",
          },
          grid: {
            color: "rgba(255,255,255,0.2)",
          },
        },
        y: {
          ticks: {
            color: "#ebedef",
          },
          grid: {
            color: "rgba(255,255,255,0.2)",
          },
        },
      },
    };

    this.multiAxisOptions = {
      plugins: {
        legend: {
          labels: {
            color: "#ebedef",
          },
        },
        tooltips: {
          mode: "index",
          intersect: true,
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#ebedef",
          },
          grid: {
            color: "rgba(255,255,255,0.2)",
          },
        },
        y: {
          type: "linear",
          display: true,
          position: "left",
          ticks: {
            min: 0,
            max: 1000000,
            color: "#ebedef",
          },
          grid: {
            color: "rgba(255,255,255,0.2)",
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          grid: {
            drawOnChartArea: false,
            color: "rgba(255,255,255,0.2)",
          },
          ticks: {
            min: 0,
            max: 1000000,
            color: "#ebedef",
          },
        },
      },
    };

    this.stackedOptions = {
      plugins: {
        legend: {
          labels: {
            color: "",
          },
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: " #981639",
          },
          grid: {
            color: "rgba(255,255,255,0.2)",
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: " #333366",
          },
          grid: {
            color: "rgba(255,255,255,0.2)",
          },
        },
      },
    };
  }

  applyLightTheme() {
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    this.horizontalOptions = {
      indexAxis: "y",
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    this.multiAxisOptions = {
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
        tooltips: {
          mode: "index",
          intersect: true,
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          type: "linear",
          display: true,
          position: "left",
          ticks: {
            min: 0,
            max: 1000000,
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          grid: {
            drawOnChartArea: false,
            color: "#ebedef",
          },
          ticks: {
            min: 0,
            max: 1000000,
            color: "#495057",
          },
        },
      },
    };

    this.stackedOptions = {
      plugins: {
        tooltips: {
          mode: "index",
          intersect: false,
        },
        legend: {
          labels: {
            color: "",
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: " #981639",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: " #333366",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };
  }

  //filtre par intervalle de date
  public calenderFilter() {
    this.filterService.register(
      "rangeDate",
      (value: any, filter: any): boolean => {
        //Afficher toute les lignes du tableau au démarrage
        if (this.rangeDates == undefined) {
          return true;
        }
        //redéfinir les dates pour comparer sans prendre en compte l'heure
        //on donne toutes les date l'heure 00:00:00
        const d = value.split("/");
        value = new Date(new Date(d[2], d[1] - 1, d[0]).toDateString());
        this.rangeDates[0] = new Date(
          new Date(this.rangeDates[0]).toDateString()
        );
        if (this.rangeDates[1] !== null) {
          this.rangeDates[1] = new Date(
            new Date(this.rangeDates[1]).toDateString()
          );
        }

        if (
          this.filterService.filters.is(value, this.rangeDates[0]) &&
          this.rangeDates[1] === null
        ) {
          return true;
        }

        if (
          this.filterService.filters.is(value, this.rangeDates[1]) &&
          this.rangeDates[0] === null
        ) {
          return true;
        }

        if (
          this.rangeDates[0] !== null &&
          this.rangeDates[1] !== null &&
          this.filterService.filters.after(value, this.rangeDates[0]) &&
          this.filterService.filters.before(value, this.rangeDates[1])
        ) {
          return true;
        }
        return false;
      }
    );
  }

  //effacer le filtre par date
  clearRange(table) {
    this.rangeDates = undefined;
    table.filter();
  }
}
