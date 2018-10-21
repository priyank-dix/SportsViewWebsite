import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Chart } from 'angular-highcharts';
import { PlayerModel } from '../models/stats';
import { IndividualSeriesOptions, DataPoint } from 'highcharts';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tracking-view',
  templateUrl: './tracking-view.component.html',
  styleUrls: ['./tracking-view.component.scss']
})
export class TrackingViewComponent implements OnInit {

  public chart: Chart;
  public calorieChart: Chart;
  public posessionChart: Chart;
  public possession: number[];
  private smallest;

  constructor(private service: AppService) {
    this.possession = [];
    this.smallest = 0;
  }

  ngOnInit() {
    this.service.stats.pipe(
      map(this.service.filterBall),
      tap(this.makeChart),
      tap(this.makeCalorieChart),
      tap(this.calculatePossession),
      tap(this.makePosessionChart)
    ).subscribe(() => {
      console.log(this.service.ball);
    });
  }

  calculatePossession = (stats: PlayerModel[]) => {
    let smallest = 0;
    let id;
    const ballPossession = stats.map(stat => stat.position[stat.position.length - 1]);
    ballPossession.forEach((ball, index) => {
      const length = Math.sqrt(Math.pow(ball.x - this.service.ball.position[this.service.ball.position.length - 1].x, 2) +
      Math.pow(ball.y - this.service.ball.position[this.service.ball.position.length - 1].y, 2));
      if (smallest === 0 || length < smallest) {
        smallest = length;
        id = index;
      }
    });
    if (smallest !== this.smallest) {
      this.possession.push(id);
      this.smallest = smallest;
    }
  }

  makePosessionChart = (stats: PlayerModel[]) => {
    this.posessionChart = new Chart({
      chart: {
        type: 'pie',
        width: 800,
        height: 400,
        backgroundColor: '#c2c2d6'
      },
      title: {
        text: 'Possession'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          animation: false
        }
      },
      series: [{
        data: stats.map((poss) => <any>{
          name: poss.playerId,
          color: this.service.hsvToRgb(poss.averageHue, 1, 1),
          y: this.possession.filter(val => val === poss.playerId).length / this.possession.length
        })
      }]
    });
  }

  makeChart = (stats: PlayerModel[]) => {
    this.chart = new Chart({
      chart: {
        type: 'column',
        width: 400,
        height: 800,
        backgroundColor: '#c2c2d6'
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
        height: 400,
        backgroundColor: '#c2c2d6'
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
