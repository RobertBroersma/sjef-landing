import {Newsletter} from "../components/newsletter/newsletter.component";
import {Spinner} from "../components/spinner/spinner.component";
import {Header} from "../components/header/header.component";
import {Mealplanner} from "../components/mealplanner/mealplanner.component";
import {Footer} from "../components/footer/footer.component";
import {Recipes} from "../components/recipes/recipes.component";

import {HomePage} from "../components/pages/home/home.component";

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Routes, RouterModule}  from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';

import {ChartsModule} from 'ng2-charts';

import {AppComponent} from './app.component';

import 'hammerjs';

const appRoutes: Routes = [
  { path: '', component: HomePage },
  { path: 'recipes', component: Recipes },
];

@NgModule({
    declarations: [
        AppComponent,
        HomePage,
        Mealplanner,
        Footer,
        Recipes,
        Spinner,
        Header,
        Newsletter
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ChartsModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        MaterialModule,
    ],
    exports: [
        MaterialModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
