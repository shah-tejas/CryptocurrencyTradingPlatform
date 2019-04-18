import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Service import
import { OrderHistoryService } from './services/order-history.service';

// Component imports
import { AppComponent } from './app.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatBadgeModule } from '@angular/material';
import { CarouselComponent } from './carousel/carousel.component';
import {MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import { TableComponent } from './order-history/table/table.component';
import {MatMenuModule} from '@angular/material/menu';
import { jqxChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';


@NgModule({
  declarations: [
    AppComponent, OrderHistoryComponent, NavBarComponent, CarouselComponent, TableComponent, jqxChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule
  ],
  providers: [
    OrderHistoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
