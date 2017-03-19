// File to bind all modules and components
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppComponent }  from './app.component';
import { SampleComponent }  from './components/sample.component';
import { AboutComponent }  from './components/about.component';
import { HomeComponent }  from './components/home.component';
import { MaterialModule } from '@angular/material';
import {routing} from './app.routing'

import { HttpModule }  from '@angular/http';
import {PaymentComponent} from "./components/payment.component";
import {TransactionComponent} from "./components/transaction.component";
import {SysInfoComponent} from "./components/sys.info";
import {UserComponent} from "./components/user.component";
import {MaterialComponent, DialogContent} from "./components/material.component";

@NgModule({
  imports:      [ BrowserModule,FormsModule,ReactiveFormsModule, HttpModule,routing,MaterialModule],
  declarations: [ AppComponent,SampleComponent,AboutComponent,HomeComponent,PaymentComponent,TransactionComponent,SysInfoComponent,UserComponent,MaterialComponent,DialogContent],
  bootstrap:    [ AppComponent ],
  entryComponents :[DialogContent]
})
export class AppModule { }
