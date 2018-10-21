import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MultiViewComponent } from './multi-view/multi-view.component';
import { AnalyticViewComponent } from './analytic-view/analytic-view.component';
import { MainViewComponent } from './main-view/main-view.component';
import { TrackingViewComponent } from './tracking-view/tracking-view.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';
import { FocusedAnalyticViewComponent } from './focused-analytic-view/focused-analytic-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MultiViewComponent,
    AnalyticViewComponent,
    MainViewComponent,
    TrackingViewComponent,
    FocusedAnalyticViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
