import { NgModule } from  '@angular/core';
import {MatNativeDateModule,MatTabsModule,MatIconModule,MatButtonModule,MatCheckboxModule, MatToolbarModule, MatCardModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatListModule,} from  '@angular/material';
import {MatDatepickerModule} from  '@angular/material/datepicker';

import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule, MatBadgeModule } from '@angular/material';
import {MatTableModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
imports: [MatNativeDateModule,MatTabsModule,MatDatepickerModule,MatIconModule,
    MatButtonModule,MatCheckboxModule, MatToolbarModule, MatCardModule,
    MatFormFieldModule,MatInputModule,MatListModule,MatRadioModule,
  LayoutModule, MatSidenavModule, MatBadgeModule, MatTableModule, MatPaginatorModule, MatSortModule, MatMenuModule],

exports: [MatNativeDateModule,MatTabsModule,
MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule,
MatToolbarModule, MatCardModule,MatFormFieldModule,MatInputModule,
MatListModule,MatRadioModule,
LayoutModule, MatSidenavModule, MatBadgeModule, MatTableModule, MatPaginatorModule, MatSortModule, MatMenuModule],

})

export  class  MyMaterialModule { }
