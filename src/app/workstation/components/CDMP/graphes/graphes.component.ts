import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphes',
  templateUrl: './graphes.component.html',
  styleUrls: ['./graphes.component.scss']
})
export class GraphesComponent implements OnInit {
  barData: any;
  barOptions: any;


  constructor() { }

  ngOnInit() {
    this.barData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: '#2f4860',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'My Second dataset',
              backgroundColor: '#00bb7e',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  };
  this.barOptions = {
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
                color:  '#ebedef',
            }
        },
        y: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color:  '#ebedef',
            }
        },
    }
};
  }

}
