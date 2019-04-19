import { NgModule } from  '@angular/core';
import {
  MatNativeDateModule,
  MatTabsModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatListModule,
  MatTableModule,
  MatSelectModule,
  MatGridListModule
} from '@angular/material';
import {MatDatepickerModule} from  '@angular/material/datepicker';

@NgModule({
imports: [MatNativeDateModule,MatTabsModule,MatDatepickerModule,MatIconModule,
    MatButtonModule,MatCheckboxModule, MatToolbarModule, MatCardModule,
    MatFormFieldModule,MatInputModule,MatListModule,MatRadioModule],

exports: [MatNativeDateModule,MatTabsModule,
MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule,
MatToolbarModule, MatCardModule,MatFormFieldModule,MatInputModule,
MatListModule,MatRadioModule,MatTableModule, MatSelectModule, MatGridListModule],

})

export  class  MyMaterialModule { }
