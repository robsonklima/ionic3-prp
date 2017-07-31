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
  @ViewChild('rcCanvas') rcCanvas;

  constructor(
    private analyticService: AnalyticService
  ) { }

  ionViewDidLoad() {
    this.analyticService.getRisksAndCategories()
      .subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {
          this.rcLabels.push(res[i].label);
          this.rcValues.push(res[i].value);

          console.log(res[i].label);
          console.log(res[i].value);
        }

        this.loadRCChart();
      },
      err => { }
      );
  }

  private loadRCChart() {
    this.rcCanvas = new Chart(this.rcCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.rcLabels,
        datasets: [{
          label: 'Amount',
          data: this.rcValues,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }
    });
  }
}