import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { AnalyticService } from '../../services/analytic';

@Component({
  selector: 'page-analytics',
  templateUrl: 'analytics.html'
})
export class AnalyticsPage {
  rcLabels: string[] = [];
  rcValues: number[] = [];
  rtLabels: string[] = [];
  rtValues: number[] = [];
  rpLabels: string[] = [];
  rpValues: number[] = [];
  raLabels: string[] = [];
  raValues: number[] = [];
  @ViewChild('rcCanvas') rcCanvas;
  @ViewChild('rtCanvas') rtCanvas;
  @ViewChild('rpCanvas') rpCanvas;
  @ViewChild('raCanvas') raCanvas;

  constructor( private analyticService: AnalyticService ) { }

  ionViewDidLoad() {
    this.analyticService.getRisksAndCategories()
      .subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {
          this.rcLabels.push(res[i].label);
          this.rcValues.push(res[i].value);
        }

        this.loadRCChart();
      }, err => { } );

    this.analyticService.getRisksAndTypes()
      .subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {
          this.rtLabels.push(res[i].label);
          this.rtValues.push(res[i].value);
        }

        this.loadRTChart();
      }, err => { } );

    this.analyticService.getRisksAndProjects()
      .subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {
          this.rpLabels.push(res[i].label);
          this.rpValues.push(res[i].value);
        }

        this.loadRPChart();
      }, err => { } );

    this.analyticService.getRisksAndActivities()
      .subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {
          this.raLabels.push(res[i].label);
          this.raValues.push(res[i].value);
        }

        this.loadRAChart();
      }, err => { } );
  }

  // Risk and Categories Chart
  private loadRCChart() {
    this.rcCanvas = new Chart(this.rcCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.rcLabels,
        datasets: [{
          label: 'Amount',
          data: this.rcValues,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255,99,132,1)'
          ],
          borderWidth: 1
        }]
      },
      options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }
    });
  }

  // Risk and Types Chart
  private loadRTChart() {
    this.rtCanvas = new Chart(this.rtCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.rtLabels,
        datasets: [{
          label: 'Amount',
          data: this.rtValues,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(255,99,132,1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }]
      },
      options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }
    });
  }

  // Risk and Projects Chart
  private loadRPChart() {
    this.rpCanvas = new Chart(this.rpCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.rpLabels,
        datasets: [{
          label: 'Amount',
          data: this.rpValues,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"
          ]
        }]
      }
    });
  }

  // Risk and Activities Chart
  private loadRAChart() {
    this.raCanvas = new Chart(this.raCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.raLabels,
        datasets: [{
          label: 'Amount',
          data: this.raValues,
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB"
          ]
        }]
      }
    });
  }
}