import { NgModule } from  '@angular/core';
import {MatNativeDateModule,MatTabsModule,MatIconModule,MatButtonModule,MatCheckboxModule, MatToolbarModule, MatCardModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatListModule, MatTableModule, MatSortModule, MatPaginatorModule} from  '@angular/material';
import {MatDatepickerModule} from  '@angular/material/datepicker';

@NgModule({
imports: [MatNativeDateModule,MatTabsModule,MatDatepickerModule,MatIconModule,
    MatButtonModule,MatCheckboxModule, MatToolbarModule, MatCardModule,
    MatFormFieldModule,MatInputModule,MatListModule,MatRadioModule, MatTableModule, MatSortModule, MatPaginatorModule ],

exports: [MatNativeDateModule,MatTabsModule,
MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule,
MatToolbarModule, MatCardModule,MatFormFieldModule,MatInputModule,
MatListModule,MatRadioModule,MatTableModule, MatSortModule, MatPaginatorModule],

})

export  class  MyMaterialModule { }
