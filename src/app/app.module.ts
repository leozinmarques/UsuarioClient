import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUsuariosComponent } from './components/add-usuarios/add-usuarios.component';
import { UsuariosEditComponent } from './components/usuarios-edit/usuarios-edit.component';
import { UsuariosListComponent } from './components/usuarios-list/usuarios-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormFieldErrorComponent } from './components/errors/_form_field_error/formfield-error.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';
defineLocale('pt-br', ptBrLocale);
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    AddUsuariosComponent,
    UsuariosEditComponent,
    UsuariosListComponent,
    FormFieldErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgSelectModule,
    DataTablesModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [],
  exports: [
    FormFieldErrorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    // containerClass: 'theme-blue',
    dateInputFormat: 'DD/MM/YYYY'
  });
}
