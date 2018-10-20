import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MultiViewComponent } from './multi-view/multi-view.component';
import { FieldViewComponent } from './field-view/field-view.component';
import { AnalyticViewComponent } from './analytic-view/analytic-view.component';
import { MainViewComponent } from './main-view/main-view.component';
import { HighlightViewComponent } from './highlight-view/highlight-view.component';
import { TrackingViewComponent } from './tracking-view/tracking-view.component';
import { AppMaterialModule } from './app-material/app-material.module';

@NgModule({
  declarations: [
    AppComponent,
    MultiViewComponent,
    FieldViewComponent,
    AnalyticViewComponent,
    MainViewComponent,
    HighlightViewComponent,
    TrackingViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
