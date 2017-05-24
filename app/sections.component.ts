import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import { URLSearchParams } from '@angular/http';

interface Section {
    _id: string;
    title: string;
}

@Component({
    selector: 'sections',
    templateUrl: 'app/sections.component.html'
})
export class SectionsComponent {
    private sectionsUrl = 'sections';  // URL to web api
    sections: Section[];

    constructor(private http: Http) { 
        this.readSections();
    }

    readSections() {
        this.getSections().subscribe(sections=>{
            this.sections=sections;
        });
    }

    getSections(): Observable<Section[]> {
        return this.http.get(this.sectionsUrl)
                .map(response => response.json() as Section[]);
    }
}