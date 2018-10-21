import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, query, style, animate } from '@angular/animations';
import { fadeAnimation } from './animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
  title = 'hackWebsite';
  items = [
    {
      name: 'Camera View',
      route: '/multi'
    },
    {
      name: 'Tracking View',
      route: '/tracking'
    },
    {
      name: 'Analytics View',
      route: '/analytic'
    },
  ];
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['']);
  }

}
