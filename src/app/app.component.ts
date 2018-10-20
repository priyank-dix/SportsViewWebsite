import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hackWebsite';
  items = [
    {
      name: 'Field View',
      route: '/field'
    },
    {
      name: 'Highlight View',
      route: '/highlight'
    },
    {
      name: 'Multi View',
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
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['']);
  }

}
