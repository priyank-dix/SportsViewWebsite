import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { mergeMap, map, tap } from 'rxjs/operators';
import { Chart } from 'angular-highcharts';
import { PlayerModel } from '../models/stats';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-focused-analytic-view',
  templateUrl: './focused-analytic-view.component.html',
  styleUrls: ['./focused-analytic-view.component.scss']
})
export class FocusedAnalyticViewComponent implements OnInit, OnDestroy {
  public stats$: Subscription;
  stats: PlayerModel;
  statsChart: Chart;
  calorieChart: Chart;


  constructor(private route: ActivatedRoute, private service: AppService) {

  }

  ngOnInit() {
    this.stats$ = this.route.queryParams.pipe(
      mergeMap((params) => this.service.stats.pipe(
        map(value => value.find(stat => stat.playerId === Number(params['chart'])))
      )),
      tap(this.makeStatsChart),
      tap(this.makeCalorieChart)
    ).subscribe();
  }

  ngOnDestroy() {
    this.stats$.unsubscribe();
  }

  makeStatsChart = (stats: PlayerModel) => {
    this.statsChart = new Chart({
      chart: {
        type: 'scatter',
        width: 400,
        height: 800
      },
      title: {
        text: 'Position'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        title: {
          text: 'Distance (m)'
        },
        min: 0,
        max: 2.5,
        tickInterval: 0.5,
        minorTickInterval: 0.5,
        gridLineWidth: 1,
        minorGridLineWidth: 1,
        gridLineColor: '#505050',
        minorGridLineColor: '#505050'
      },
      yAxis: {
        title: {
          text: 'Distance (m)'
        },
        min: 0,
        max: 5,
        tickInterval: 0.5,
        minorTickInterval: 0.5,
        gridLineWidth: 1,
        minorGridLineWidth: 1,
        gridLineColor: '#505050',
        minorGridLineColor: '#505050'
      },
      plotOptions: {
        scatter: {
          lineWidth: 1,
          animation: false
        }
      },
      series: [
        {
          name: 'Position',
          // @ts-ignore
          data: stats.position.map((value) => [value.x, value.y]),
          color: this.service.hsvToRgb(stats.averageHue, 1, 1)
        }
      ]
    });
  }

  makeCalorieChart = (stats: PlayerModel) => {
    let combined: any[] = [];
    for (let i = 0; i < stats.distanceTraveled.length; i++) {
      combined.push({
        distance: stats.distanceTraveled[i],
        time: stats.timeDiff[i]
      });
    }
    // @ts-ignore
    combined = this.service.cumulativeSum(combined);
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
      series: [
        {
          name: 'Calories',
          data: combined.map(value => value.distance * 0.0625),
          color: this.service.hsvToRgb(stats.averageHue, 1, 1)
        }
      ]
    });
  }

}
