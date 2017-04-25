import {Newsletter} from "../components/newsletter/newsletter.component";
import {Spinner} from "../components/spinner/spinner.component";
import {Mealplanner} from "../components/mealplanner/mealplanner.component";

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { Routes, RouterModule }  from '@angular/router';

import {ChartsModule} from 'ng2-charts';

import {AppComponent} from './app.component';

const appRoutes: Routes = [
  { path: '', component: Mealplanner },
];

@NgModule({
    declarations: [
        AppComponent,
        Mealplanner,
        Spinner,
        Newsletter
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ChartsModule,
        RouterModule.forRoot(appRoutes),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
