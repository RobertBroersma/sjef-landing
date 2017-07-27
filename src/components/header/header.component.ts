import {Component, OnInit, Input} from '@angular/core';
import {Http} from '@angular/http';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'sjef-header',
    templateUrl: 'header.html'
})
export class Header implements OnInit {

    constructor(public http: Http, private route: ActivatedRoute) {}

    ngOnInit() {

    }
}
