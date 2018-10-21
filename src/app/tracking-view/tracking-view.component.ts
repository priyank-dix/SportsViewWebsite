import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Chart } from 'angular-highcharts';
import { PlayerModel } from '../models/stats';
import { IndividualSeriesOptions } from 'highcharts';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tracking-view',
  templateUrl: './tracking-view.component.html',
  styleUrls: ['./tracking-view.component.scss']
})
export class TrackingViewComponent implements OnInit {

  public chart: Chart;
  public calorieChart: Chart;

  constructor(private service: AppService) {
  }

  ngOnInit() {
    this.service.stats.pipe(
      tap(this.makeChart),
      tap(this.makeCalorieChart)
    ).subscribe();
  }

  makeChart = (stats: PlayerModel[]) => {
    this.chart = new Chart({
      chart: {
        type: 'column',
        width: 400,
        height: 800
      },
      title: {
        text: 'Distance Traveled'
      },
      yAxis: {
        title: {
          text: 'Distance (m)'
        },
        units: [
          ['meters', []]
        ]
      },
      xAxis: {
        title: {
          text: 'Player ID'
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        column: {
          animation: false
        }
      },
      series: stats.map(stat => <IndividualSeriesOptions>{
          name: String(stat.playerId),
          data: [stat.distanceTraveled.reduce((prev, curr) => prev += curr, 0)],
          color: this.service.hsvToRgb(stat.averageHue, 1, 1)
        })
    });
  }

  makeCalorieChart = (stats: PlayerModel[]) => {
    let combined: any[][] = [];
    stats.forEach(stat => {
      const subCombined: any[] = [];
      for (let i = 0; i < stat.distanceTraveled.length; i++) {
        subCombined.push({
          distance: stat.distanceTraveled[i],
          time: stat.timeDiff[i]
        });
      }
      combined.push(subCombined);
    });
    combined = combined.map(this.service.cumulativeSum);
    this.calorieChart = new Chart({
      chart: {
        type: 'line',
        width: 800,
        height: 400
      },
      title: {
        text: 'Calories Burned'
      },
      yAxis: {
        title: {
          text: 'Cumulative Calories'
        }
      },
      xAxis: {
        title: {
          text: 'Time'
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        line: {
          animation: false
        }
      },
      series: combined.map(comb => <IndividualSeriesOptions>{
        data: comb.map(value => value.distance * 0.0625)
      })
    });
  }

}
