import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analytic-view',
  templateUrl: './analytic-view.component.html',
  styleUrls: ['./analytic-view.component.scss']
})
export class AnalyticViewComponent implements OnInit {
  size: number[];

  constructor(private service: AppService, private router: Router) {
  }

  ngOnInit() {
    this.service.getStatsNum().subscribe((item) => {
      this.size = Array.from({ length: item.size }, (v, i) => i);
    });
  }

  viewChart = (pick: number) => {
    this.router.navigate(['focused'], {
      queryParams: {
        'chart': pick
      }
    });
  }

}
