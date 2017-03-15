import {Component} from '@angular/core';
import {Http} from '@angular/http';

@Component({
    selector: 'newsletter',
    templateUrl: 'newsletter.html'
})
export class Newsletter {

    constructor(public http: Http) {

    }
}
