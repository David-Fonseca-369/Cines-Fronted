import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'; 

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';

//autcomplete
import {MatAutocompleteModule} from '@angular/material/autocomplete';

//componenete tabla
import {MatTableModule} from  '@angular/material/table';

//componente de arrastre 
import {DragDropModule} from '@angular/cdk/drag-drop';

//paginacion
import {MatPaginatorModule} from '@angular/material/paginator';

//loader 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

//chips
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatTableModule,
    DragDropModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],  
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
