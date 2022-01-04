import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { TwoColumnComponent } from './components/layouts/two-column/two-column.component';
import { HeadersComponent } from './components/headers/headers.component';
import { MatListModule } from '@angular/material/list';

// Imported and Exported collections
const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  NgxSpinnerModule
];
const components = [
  TwoColumnComponent,
  HeadersComponent
];
const pipes = [];

@NgModule({
  declarations: [
    TwoColumnComponent,
    HeadersComponent
  ],
  imports: [
    modules
  ],
  exports: [
    modules,
    components
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
