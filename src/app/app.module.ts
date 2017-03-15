import {Newsletter} from "../components/newsletter/newsletter.component";
import {Spinner} from "../components/spinner/spinner.component";
import {Mealplanner} from "../components/mealplanner/mealplanner.component";

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {ChartsModule} from 'ng2-charts';

import {AppComponent} from './app.component';

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
        ChartsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
