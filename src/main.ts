///<reference path="../typings/globals/underscore/index.d.ts"/>

import './polyfills.ts';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'chart.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
