import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {ActivatedRoute, Params} from '@angular/router';
import * as _ from 'underscore';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'homepage',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    constructor(public http: Http, private route: ActivatedRoute) {}

    ngOnInit() {

    }
}
